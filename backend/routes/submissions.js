const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Problem, Submission } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const LANGUAGE_MAP = {
    'python': 71,
    'cpp': 54,
    'java': 62
};

// Submit solution
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        const { problem_id, code, language } = req.body;
        const user_id = req.user.id;
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        // Log helper   
        const log = (msg) => {
            if (req.io) req.io.to(`user_${user_id}`).emit('execution_log', { message: msg, time: new Date().toLocaleTimeString() });
        };

        // Emit that execution has started
        log('🚀 Initializing Build Environment...');
        await delay(500);
        // Fetch problem details for sample testing
        const problem = await Problem.findByPk(problem_id, {
            attributes: ['title', 'sample_input', 'sample_output']
        });
        
        if (!problem) return res.status(404).json({ message: "Problem not found" });

        const language_id = LANGUAGE_MAP[language] || 71;
        log(`🔍 Loading problem context: ${problem.title}`);
        await delay(300);

        let resultOutput, resultStatus, resultStdout, resultStderr;

        if (!process.env.JUDGE0_API_KEY) {
            const fs = require('fs');
            const path = require('path');
            const os = require('os');
            const { execSync } = require('child_process');
            
            const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codepulse-exec-'));
            log(`📁 Created Sandbox: ${path.basename(tmpDir)}`);
            await delay(300);
            
            let stdout = "", stderr = "", execStatus = 0;
            const input = problem.sample_input || "";
            
            try {
                if (language === 'java') {
                    log('💾 Writing Java source file...');
                    const match = code.match(/class\s+([A-Za-z0-9_]+)/);
                    const className = match ? match[1] : 'Main';
                    const file = path.join(tmpDir, `${className}.java`);
                    fs.writeFileSync(file, code);
                    log('⚙️ Compiling and Running Java Binary...');
                    await delay(500);
                    stdout = execSync(`java "${file}"`, { input, timeout: 8000, encoding: 'utf-8' });
                } else if (language === 'python') {
                    log('💾 Writing Python script...');
                    const file = path.join(tmpDir, 'script.py');
                    fs.writeFileSync(file, code);
                    const pythonBin = fs.existsSync('C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python311\\python.exe') ? 
                        '"C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python311\\python.exe"' : 'python';
                    log('⚙️ Executing Python virtual machine...');
                    await delay(500);
                    stdout = execSync(`${pythonBin} "${file}"`, { input, timeout: 5000, encoding: 'utf-8' });
                } else if (language === 'cpp') {
                    log('💾 Writing C++ script...');
                    const file = path.join(tmpDir, 'main.cpp');
                    const exe = path.join(tmpDir, 'a.exe');
                    fs.writeFileSync(file, code);
                    const cppBin = fs.existsSync('C:\\Users\\hp\\AppData\\Local\\Microsoft\\WinGet\\Packages\\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\\mingw64\\bin\\g++.exe') ? 
                        '"C:\\Users\\hp\\AppData\\Local\\Microsoft\\WinGet\\Packages\\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\\mingw64\\bin\\g++.exe"' : 'g++';
                    log('⚙️ Linking Native Binary with g++...');
                    await delay(500);
                    execSync(`${cppBin} "${file}" -o "${exe}"`, { timeout: 10000, encoding: 'utf-8' });
                    log('⚙️ Executing Native Binary...');
                    await delay(300);
                    stdout = execSync(`"${exe}"`, { input, timeout: 5000, encoding: 'utf-8' });
                }
                log('✅ Output captured successfully.');
            } catch (e) {
                log('❌ Runtime exception detected.');
                stderr = e.stderr ? e.stderr.toString() : e.message;
                execStatus = e.status || 1;
            } finally {
                // Cleanup! 
                try {
                    fs.rmSync(tmpDir, { recursive: true, force: true });
                    log(`🧹 Sandbox ${path.basename(tmpDir)} cleaned up.`);
                } catch (err) {
                    console.error('Failed to cleanup tmpDir:', err);
                }
            }
            
            resultStderr = stderr;
            resultStdout = stdout;
            resultOutput = stdout || stderr;
            
            if (execStatus !== 0) {
                resultStatus = 'Compilation/Runtime Error';
            } else {
                log('🧠 Validating output against testcases...');
                await delay(400);
                const expected = (problem.sample_output || "").trim();
                const actual = stdout.trim();
                const normalizeOutput = (str) => str.replace(/\s+/g, "");
                
                if (normalizeOutput(actual) === normalizeOutput(expected)) {
                    resultStatus = 'Accepted';
                } else {
                    resultStatus = 'Wrong Answer';
                }
            }
        } else {
            // Judge0 Path (simulated logs)
            log('⚡ Forwarding to Judge0 Remote Worker...');
            const options = {
                method: 'POST',
                url: `${process.env.JUDGE0_API_URL}/submissions`,
                params: { base64_encoded: 'true', wait: 'true' },
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
                    'X-RapidAPI-Host': new URL(process.env.JUDGE0_API_URL).hostname
                },
                data: {
                    language_id: language_id,
                    source_code: Buffer.from(code).toString('base64'),
                    stdin: Buffer.from(problem.sample_input || "").toString('base64'),
                    expected_output: Buffer.from(problem.sample_output || "").toString('base64')
                }
            };

            const response = await axios.request(options);
            log('✅ Response received from Judge0.');
            const { stdout, stderr, status, compile_output } = response.data;

            resultStdout = stdout ? Buffer.from(stdout, 'base64').toString() : null;
            resultStderr = stderr ? Buffer.from(stderr, 'base64').toString() : null;
            resultOutput = stdout ? Buffer.from(stdout, 'base64').toString() : (stderr ? Buffer.from(stderr, 'base64').toString() : Buffer.from(compile_output || "", 'base64').toString());
            resultStatus = status.description;
        }

        // Save submission 
        const submission = await Submission.create({
            user_id,
            problem_id,
            code,
            language,
            output: resultOutput,
            status: resultStatus
        });

        // Emit final status
        log(`🎌 Verdict: ${resultStatus}`);
        if (req.io) {
            if (resultStatus === 'Accepted') {
                // Broadcast to everyone!
                req.io.emit('global_solve', { 
                    user_name: req.user.name, 
                    problem_title: problem.title,
                    time: new Date().toLocaleTimeString() 
                });
            }

            req.io.to(`user_${user_id}`).emit('execution_complete', { 
                status: resultStatus, 
                problem_id,
                output: resultOutput,
                stdout: resultStdout,
                stderr: resultStderr
            });
        }

        res.json({
            output: resultOutput,
            status: resultStatus,
            stdout: resultStdout,
            stderr: resultStderr
        });

    } catch (error) {
        console.error(error);
        if (req.io && req.user) {
            req.io.to(`user_${req.user.id}`).emit('execution_log', { message: '⛔ Server Fault Connection Terminated.', time: new Date().toLocaleTimeString() });
            req.io.to(`user_${req.user.id}`).emit('execution_complete', { status: 'Server Error' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Get user submissions
router.get('/', authenticateToken, async (req, res) => {
    try {
        const submissions = await Submission.findAll({
            where: { user_id: req.user.id },
            include: [{
                model: Problem,
                as: 'problem',
                attributes: ['title']
            }],
            order: [['created_at', 'DESC']]
        });

        // Flatten the response for frontend compatibility
        const flattened = submissions.map(sub => ({
            ...sub.toJSON(),
            problem_title: sub.problem ? sub.problem.title : 'Unknown Problem'
        }));

        res.json(flattened);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

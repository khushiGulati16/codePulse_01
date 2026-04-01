const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });

const Problem = sequelize.define('Problem', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    difficulty: { type: DataTypes.STRING, allowNull: false },
    input_format: { type: DataTypes.TEXT, allowNull: false },
    output_format: { type: DataTypes.TEXT, allowNull: false },
    sample_input: { type: DataTypes.TEXT },
    sample_output: { type: DataTypes.TEXT }
}, { tableName: 'problems', timestamps: true, createdAt: 'created_at', updatedAt: false });

const Submission = sequelize.define('Submission', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    problem_id: { type: DataTypes.INTEGER, allowNull: false },
    code: { type: DataTypes.TEXT, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    output: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'submissions', timestamps: true, createdAt: 'created_at', updatedAt: false });

User.hasMany(Submission, { foreignKey: 'user_id' });
Submission.belongsTo(User, { foreignKey: 'user_id' });

Problem.hasMany(Submission, { foreignKey: 'problem_id' });
Submission.belongsTo(Problem, { foreignKey: 'problem_id', as: 'problem' });

module.exports = { sequelize, User, Problem, Submission };

const { Problem } = require('./models');

const problems = [
  {
    "id": 28,
    "title": "Two Sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "difficulty": "Easy",
    "input_format": "nums = [2,7,11,15], target = 9",
    "output_format": "[0,1]",
    "sample_input": "2,7,11,15\n9",
    "sample_output": "[0,1]",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 29,
    "title": "Palindrome Number1",
    "description": "Given an integer x, return true if x is a palindrome, and false otherwise.",
    "difficulty": "Easy",
    "input_format": "x = 121",
    "output_format": "true",
    "sample_input": "121",
    "sample_output": "true",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 30,
    "title": "Reverse Integer",
    "description": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    "difficulty": "Easy",
    "input_format": "x = 123",
    "output_format": "321",
    "sample_input": "123",
    "sample_output": "321",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 31,
    "title": "Valid Anagram",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "difficulty": "Easy",
    "input_format": "s = \"anagram\", t = \"nagaram\"",
    "output_format": "true",
    "sample_input": "anagram\nnagaram",
    "sample_output": "true",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 32,
    "title": "Climbing Stairs",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "difficulty": "Easy",
    "input_format": "n = 3",
    "output_format": "3",
    "sample_input": "3",
    "sample_output": "3",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 33,
    "title": "Maximum Subarray",
    "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    "difficulty": "Easy",
    "input_format": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    "output_format": "6",
    "sample_input": "-2,1,-3,4,-1,2,1,-5,4",
    "sample_output": "6",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 34,
    "title": "Longest Substring",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "difficulty": "Medium",
    "input_format": "s = \"abcabcbb\"",
    "output_format": "3",
    "sample_input": "abcabcbb",
    "sample_output": "3",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 35,
    "title": "Container With Most Water",
    "description": "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    "difficulty": "Medium",
    "input_format": "height = [1,8,6,2,5,4,8,3,7]",
    "output_format": "49",
    "sample_input": "1,8,6,2,5,4,8,3,7",
    "sample_output": "49",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 36,
    "title": "Group Anagrams",
    "description": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    "difficulty": "Medium",
    "input_format": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
    "output_format": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    "sample_input": "eat,tea,tan,ate,nat,bat",
    "sample_output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 37,
    "title": "Product of Array Except Self",
    "description": "Return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    "difficulty": "Medium",
    "input_format": "nums = [1,2,3,4]",
    "output_format": "[24,12,8,6]",
    "sample_input": "1,2,3,4",
    "sample_output": "[24,12,8,6]",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 38,
    "title": "3Sum",
    "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    "difficulty": "Medium",
    "input_format": "nums = [-1,0,1,2,-1,-4]",
    "output_format": "[[-1,-1,2],[-1,0,1]]",
    "sample_input": "-1,0,1,2,-1,-4",
    "sample_output": "[[-1,-1,2],[-1,0,1]]",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 39,
    "title": "Longest Consecutive Sequence",
    "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
    "difficulty": "Medium",
    "input_format": "nums = [100,4,200,1,3,2]",
    "output_format": "4",
    "sample_input": "100,4,200,1,3,2",
    "sample_output": "4",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 40,
    "title": "Median of Two Sorted Arrays",
    "description": "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
    "difficulty": "Hard",
    "input_format": "nums1 = [1,3], nums2 = [2]",
    "output_format": "2.00000",
    "sample_input": "1,3\n2",
    "sample_output": "2.00000",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 41,
    "title": "First Missing Positive",
    "description": "Given an unsorted integer array nums, return the smallest missing positive integer.",
    "difficulty": "Hard",
    "input_format": "nums = [1,2,0]",
    "output_format": "3",
    "sample_input": "1,2,0",
    "sample_output": "3",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 42,
    "title": "Trapping Rain Water",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "difficulty": "Hard",
    "input_format": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    "output_format": "6",
    "sample_input": "0,1,0,2,1,0,1,3,2,1,2,1",
    "sample_output": "6",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 43,
    "title": "Minimum Window Substring",
    "description": "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.",
    "difficulty": "Hard",
    "input_format": "s = \"ADOBECODEBANC\", t = \"ABC\"",
    "output_format": "BANC",
    "sample_input": "ADOBECODEBANC\nABC",
    "sample_output": "BANC",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 44,
    "title": "Largest Rectangle in Histogram",
    "description": "Given an array of integers heights representing the histogram bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    "difficulty": "Hard",
    "input_format": "heights = [2,1,5,6,2,3]",
    "output_format": "10",
    "sample_input": "2,1,5,6,2,3",
    "sample_output": "10",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 45,
    "title": "Sudoku Solver",
    "description": "Write a program to solve a Sudoku puzzle by filling the empty cells.",
    "difficulty": "Hard",
    "input_format": "A partially filled 9x9 board.",
    "output_format": "The completed board.",
    "sample_input": "5,3,.,.,7,.,.,.,.,6,.,.,1,9,5,.,.,.,.,9,8,.,.,.,.,6,.,8,.,.,.,6,.,.,.,3,4,.,.,8,.,3,.,.,1,7,.,.,.,2,.,.,.,6,.,6,.,.,.,.,2,8,.,.,.,.,4,1,9,.,.,5,.,.,.,.,8,.,.,7,9",
    "sample_output": "5,3,4,6,7,8,9,1,2,6,7,2,1,9,5,3,4,8,1,9,8,3,4,2,5,6,7,8,5,9,7,6,1,4,2,3,4,2,6,8,5,3,7,9,1,7,1,3,9,2,4,8,5,6,9,6,1,5,3,7,2,8,4,2,8,7,4,1,9,6,3,5,3,4,5,2,8,6,1,7,9",
    "created_at": "2026-03-29T11:25:03.000Z"
  },
  {
    "id": 46,
    "title": "duplicate number",
    "description": "find it.",
    "difficulty": "Easy",
    "input_format": "12234",
    "output_format": "2",
    "sample_input": "2334",
    "sample_output": "3",
    "created_at": "2026-03-29T11:29:51.000Z"
  }
];

async function seed() {
    try {
        await Problem.bulkCreate(problems, { ignoreDuplicates: true });
        console.log('Seeded successfully');
    } catch (err) {
        console.error(err);
    }
}
seed();
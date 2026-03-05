export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  id: number;
  title: string;
  acceptance: number;
  difficulty: Difficulty;
  tags: string[];
  solved?: boolean;
};

export const problems: Problem[] = [
  { id: 1, title: "Two Sum", acceptance: 57.1, difficulty: "Easy", tags: ["Array", "Hash Table"], solved: true },
  { id: 2, title: "Add Two Numbers", acceptance: 48.0, difficulty: "Medium", tags: ["Linked List", "Math"] },
  { id: 3, title: "Longest Substring Without Repeating Characters", acceptance: 38.6, difficulty: "Medium", tags: ["String", "Sliding Window"] },
  { id: 4, title: "Median of Two Sorted Arrays", acceptance: 46.0, difficulty: "Hard", tags: ["Array", "Binary Search"] },
  { id: 5, title: "Longest Palindromic Substring", acceptance: 37.4, difficulty: "Medium", tags: ["String", "Dynamic Programming"] },
  { id: 6, title: "Zigzag Conversion", acceptance: 53.6, difficulty: "Medium", tags: ["String"] },
  { id: 7, title: "Reverse Integer", acceptance: 31.6, difficulty: "Medium", tags: ["Math"] },
  { id: 8, title: "String to Integer (atoi)", acceptance: 20.6, difficulty: "Medium", tags: ["String"] },
  { id: 9, title: "Palindrome Number", acceptance: 60.3, difficulty: "Easy", tags: ["Math"], solved: true },
  { id: 10, title: "Regular Expression Matching", acceptance: 30.5, difficulty: "Hard", tags: ["String", "Dynamic Programming"] },
  { id: 11, title: "Container With Most Water", acceptance: 59.6, difficulty: "Medium", tags: ["Array", "Two Pointers", "Greedy"] },
  { id: 12, title: "Integer to Roman", acceptance: 70.5, difficulty: "Medium", tags: ["Math", "String"] },
  { id: 13, title: "Roman to Integer", acceptance: 66.3, difficulty: "Easy", tags: ["Math", "String"] },
  { id: 14, title: "Longest Common Prefix", acceptance: 44.5, difficulty: "Easy", tags: ["String"] },
  { id: 15, title: "3Sum", acceptance: 36.5, difficulty: "Medium", tags: ["Array", "Two Pointers", "Sorting"] },
  { id: 16, title: "3Sum Closest", acceptance: 45.8, difficulty: "Medium", tags: ["Array", "Two Pointers", "Sorting"] },
  { id: 17, title: "Letter Combinations of a Phone Number", acceptance: 62.8, difficulty: "Medium", tags: ["String", "Backtracking"] },
  { id: 18, title: "4Sum", acceptance: 38.9, difficulty: "Medium", tags: ["Array", "Two Pointers", "Sorting"] },
  { id: 19, title: "Remove Nth Node From End of List", acceptance: 47.2, difficulty: "Medium", tags: ["Linked List", "Two Pointers"] },
  { id: 20, title: "Valid Parentheses", acceptance: 41.2, difficulty: "Easy", tags: ["String", "Stack"], solved: true },
  { id: 21, title: "Merge Two Sorted Lists", acceptance: 66.0, difficulty: "Easy", tags: ["Linked List"] },
  { id: 22, title: "Generate Parentheses", acceptance: 76.0, difficulty: "Medium", tags: ["String", "Backtracking"] },
  { id: 23, title: "Merge k Sorted Lists", acceptance: 55.2, difficulty: "Hard", tags: ["Linked List", "Heap"] },
  { id: 24, title: "Swap Nodes in Pairs", acceptance: 66.1, difficulty: "Medium", tags: ["Linked List"] },
  { id: 25, title: "Reverse Nodes in k-Group", acceptance: 60.7, difficulty: "Hard", tags: ["Linked List"] },
];

export const topicTags = [
  { name: "Array", count: 2115 },
  { name: "String", count: 859 },
  { name: "Hash Table", count: 795 },
  { name: "Math", count: 654 },
  { name: "Dynamic Programming", count: 645 },
  { name: "Sorting", count: 509 },
  { name: "Greedy", count: 455 },
  { name: "Depth-First Search", count: 336 },
  { name: "Binary Search", count: 320 },
  { name: "Tree", count: 298 },
  { name: "Two Pointers", count: 276 },
  { name: "Stack", count: 245 },
];

export const categoryTabs = [
  { name: "All Topics", icon: "grid" },
  { name: "Algorithms", icon: "brain" },
  { name: "Database", icon: "database" },
  { name: "Shell", icon: "terminal" },
  { name: "Concurrency", icon: "layers" },
  { name: "JavaScript", icon: "code" },
];

export type ProblemDetail = {
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>;
};

export const problemDetails: Record<number, ProblemDetail> = {
  1: {
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
    starterCode: {
      Python3: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your solution here\n        pass`,
      JavaScript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your solution here\n};`,
      TypeScript: `function twoSum(nums: number[], target: number): number[] {\n    // Write your solution here\n};`,
      Java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`,
      "C++": `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};`,
      Go: `func twoSum(nums []int, target int) []int {\n    // Write your solution here\n    return nil\n}`,
    },
  },
  2: {
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]" },
    ],
    constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 <= Node.val <= 9", "It is guaranteed that the list represents a number that does not have leading zeros."],
    starterCode: {
      Python3: `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
      JavaScript: `/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function(l1, l2) {\n    \n};`,
      TypeScript: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n    \n};`,
      Java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};`,
      Go: `func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {\n    \n}`,
    },
  },
  3: {
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      Python3: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
      JavaScript: `var lengthOfLongestSubstring = function(s) {\n    \n};`,
      TypeScript: `function lengthOfLongestSubstring(s: string): number {\n    \n};`,
      Java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};`,
      Go: `func lengthOfLongestSubstring(s string) int {\n    \n}`,
    },
  },
  4: {
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000", explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." },
    ],
    constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000", "1 <= m + n <= 2000", "-10^6 <= nums1[i], nums2[i] <= 10^6"],
    starterCode: {
      Python3: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        pass`,
      JavaScript: `var findMedianSortedArrays = function(nums1, nums2) {\n    \n};`,
      TypeScript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    \n};`,
      Java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      Go: `func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    \n}`,
    },
  },
  5: {
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    starterCode: {
      Python3: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass`,
      JavaScript: `var longestPalindrome = function(s) {\n    \n};`,
      TypeScript: `function longestPalindrome(s: string): string {\n    \n};`,
      Java: `class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};`,
      Go: `func longestPalindrome(s string) string {\n    \n}`,
    },
  },
  9: {
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left it becomes 121-. Therefore it is not a palindrome." },
      { input: "x = 10", output: "false", explanation: "Reads 01 from right to left. Therefore it is not a palindrome." },
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    starterCode: {
      Python3: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass`,
      JavaScript: `var isPalindrome = function(x) {\n    \n};`,
      TypeScript: `function isPalindrome(x: number): boolean {\n    \n};`,
      Java: `class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        \n    }\n};`,
      Go: `func isPalindrome(x int) bool {\n    \n}`,
    },
  },
  10: {
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n'.' Matches any single character.\n'*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).",
    examples: [
      { input: 's = "aa", p = "a"', output: "false", explanation: '"a" does not match the entire string "aa".' },
      { input: 's = "aa", p = "a*"', output: "true", explanation: '"*" means zero or more of the preceding element, "a". Therefore, by repeating "a" once, it becomes "aa".' },
      { input: 's = "ab", p = ".*"', output: "true", explanation: '".*" means "zero or more (*) of any character (.)".' },
    ],
    constraints: ["1 <= s.length <= 20", "1 <= p.length <= 20", "s contains only lowercase English letters.", "p contains only lowercase English letters, '.', and '*'."],
    starterCode: {
      Python3: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass`,
      JavaScript: `var isMatch = function(s, p) {\n    \n};`,
      TypeScript: `function isMatch(s: string, p: string): boolean {\n    \n};`,
      Java: `class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        \n    }\n};`,
      Go: `func isMatch(s string, p string) bool {\n    \n}`,
    },
  },
  11: {
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area is between index 1 and 8." },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      Python3: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass`,
      JavaScript: `var maxArea = function(height) {\n    \n};`,
      TypeScript: `function maxArea(height: number[]): number {\n    \n};`,
      Java: `class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};`,
      Go: `func maxArea(height []int) int {\n    \n}`,
    },
  },
  13: {
    description: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nGiven a roman numeral, convert it to an integer.",
    examples: [
      { input: 's = "III"', output: "3", explanation: "III = 3." },
      { input: 's = "LVIII"', output: "58", explanation: "L = 50, V= 5, III = 3." },
      { input: 's = "MCMXCIV"', output: "1994", explanation: "M = 1000, CM = 900, XC = 90 and IV = 4." },
    ],
    constraints: ["1 <= s.length <= 15", "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').", "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."],
    starterCode: {
      Python3: `class Solution:\n    def romanToInt(self, s: str) -> int:\n        pass`,
      JavaScript: `var romanToInt = function(s) {\n    \n};`,
      TypeScript: `function romanToInt(s: string): number {\n    \n};`,
      Java: `class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    int romanToInt(string s) {\n        \n    }\n};`,
      Go: `func romanToInt(s string) int {\n    \n}`,
    },
  },
  14: {
    description: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".",
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: "There is no common prefix among the input strings." },
    ],
    constraints: ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] consists of only lowercase English letters."],
    starterCode: {
      Python3: `class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        pass`,
      JavaScript: `var longestCommonPrefix = function(strs) {\n    \n};`,
      TypeScript: `function longestCommonPrefix(strs: string[]): string {\n    \n};`,
      Java: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        \n    }\n};`,
      Go: `func longestCommonPrefix(strs []string) string {\n    \n}`,
    },
  },
  15: {
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0, nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0, nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]." },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      Python3: `class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        pass`,
      JavaScript: `var threeSum = function(nums) {\n    \n};`,
      TypeScript: `function threeSum(nums: number[]): number[][] {\n    \n};`,
      Java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};`,
      Go: `func threeSum(nums []int) [][]int {\n    \n}`,
    },
  },
  20: {
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
      { input: 's = "([])"', output: "true" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}.'"],
    starterCode: {
      Python3: `class Solution:\n    def isValid(self, s: str) -> bool:\n        pass`,
      JavaScript: `var isValid = function(s) {\n    \n};`,
      TypeScript: `function isValid(s: string): boolean {\n    \n};`,
      Java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
      Go: `func isValid(s string) bool {\n    \n}`,
    },
  },
  21: {
    description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."],
    starterCode: {
      Python3: `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
      JavaScript: `var mergeTwoLists = function(list1, list2) {\n    \n};`,
      TypeScript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {\n    \n};`,
      Java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};`,
      Go: `func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {\n    \n}`,
    },
  },
  23: {
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
      { input: "lists = [[]]", output: "[]" },
    ],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500", "-10^4 <= lists[i][j] <= 10^4", "lists[i] is sorted in ascending order.", "The sum of lists[i].length will not exceed 10^4."],
    starterCode: {
      Python3: `class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        pass`,
      JavaScript: `var mergeKLists = function(lists) {\n    \n};`,
      TypeScript: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {\n    \n};`,
      Java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}`,
      "C++": `class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};`,
      Go: `func mergeKLists(lists []*ListNode) *ListNode {\n    \n}`,
    },
  },
};

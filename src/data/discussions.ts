export interface DiscussionComment {
  id: string;
  problemId: number;
  username: string;
  initials: string;
  content: string;
  timestamp: number;
  upvotes: number;
}

const DAY = 86400000;
const now = Date.now();

export const mockDiscussions: Record<number, DiscussionComment[]> = {
  // ===== EASY =====

  // 1 - Two Sum
  1: [
    {
      id: "d1-1",
      problemId: 1,
      username: "ArjunDev",
      initials: "AD",
      content:
        "HashMap approach: iterate once, store complement (target - nums[i]) as key. If complement exists, return indices. O(n) time, O(n) space.",
      timestamp: now - 1.2 * DAY,
      upvotes: 24,
    },
    {
      id: "d1-2",
      problemId: 1,
      username: "PriyaCodes",
      initials: "PC",
      content:
        "Sorting + two pointers also works but it changes the original indices, so you'd need to track them separately. Stick with hash map for cleaner code.",
      timestamp: now - 2.5 * DAY,
      upvotes: 12,
    },
    {
      id: "d1-3",
      problemId: 1,
      username: "RohitSolves",
      initials: "RS",
      content:
        "Edge case: handle duplicate values carefully. If target is 6 and array has two 3s, make sure you don't return the same index twice.",
      timestamp: now - 4.1 * DAY,
      upvotes: 8,
    },
  ],

  // 2 - Reverse String
  2: [
    {
      id: "d2-1",
      problemId: 2,
      username: "MeenakshiDev",
      initials: "MD",
      content:
        "Classic two-pointer approach: swap s[left] and s[right], then move both inward. O(n) time, O(1) space since it's in-place.",
      timestamp: now - 0.8 * DAY,
      upvotes: 19,
    },
    {
      id: "d2-2",
      problemId: 2,
      username: "KaranSingh",
      initials: "KS",
      content:
        "In Python you can do s[:] = s[::-1] but that's using built-in magic. For interviews, stick with the manual swap to show understanding.",
      timestamp: now - 1.7 * DAY,
      upvotes: 14,
    },
    {
      id: "d2-3",
      problemId: 2,
      username: "AishwaryaR",
      initials: "AR",
      content:
        "Be careful with the constraint 'modify in-place'. Returning a new string won't be accepted. Use XOR swap or temp variable.",
      timestamp: now - 3.3 * DAY,
      upvotes: 7,
    },
  ],

  // 3 - Valid Parentheses
  3: [
    {
      id: "d3-1",
      problemId: 3,
      username: "SureshKumar",
      initials: "SK",
      content:
        "Use a stack: push opening brackets, pop on closing brackets and check if they match. If stack is empty at end, it's valid. O(n) time and space.",
      timestamp: now - 0.5 * DAY,
      upvotes: 22,
    },
    {
      id: "d3-2",
      problemId: 3,
      username: "AnanyaGupta",
      initials: "AG",
      content:
        "Pro tip: use a hash map to map closing brackets to opening ones. Cleaner than a chain of if-else statements.",
      timestamp: now - 2.0 * DAY,
      upvotes: 16,
    },
    {
      id: "d3-3",
      problemId: 3,
      username: "DeveshPatel",
      initials: "DP",
      content:
        "Don't forget the edge case where the string has odd length - you can immediately return false without even using the stack.",
      timestamp: now - 5.1 * DAY,
      upvotes: 11,
    },
    {
      id: "d3-4",
      problemId: 3,
      username: "RiyaShah",
      initials: "RS",
      content:
        "Another edge case: string starts with a closing bracket. Make sure to check stack isn't empty before popping.",
      timestamp: now - 6.2 * DAY,
      upvotes: 5,
    },
  ],

  // 4 - Maximum Depth of Binary Tree
  4: [
    {
      id: "d4-1",
      problemId: 4,
      username: "AmitTrehan",
      initials: "AT",
      content:
        "Simple DFS recursion: return 1 + max(maxDepth(left), maxDepth(right)). Base case: null node returns 0. O(n) time where n is number of nodes.",
      timestamp: now - 1.0 * DAY,
      upvotes: 20,
    },
    {
      id: "d4-2",
      problemId: 4,
      username: "PoojaNair",
      initials: "PN",
      content:
        "BFS approach works too: use a queue for level-order traversal, count levels. Both DFS and BFS are O(n) time but BFS uses O(w) space where w is max width.",
      timestamp: now - 2.8 * DAY,
      upvotes: 15,
    },
    {
      id: "d4-3",
      problemId: 4,
      username: "HarshVardhan",
      initials: "HV",
      content:
        "For iterative DFS, use a stack of (node, depth) pairs. Avoids recursion stack overflow on extremely deep trees.",
      timestamp: now - 4.6 * DAY,
      upvotes: 9,
    },
  ],

  // 5 - Merge Sorted Array
  5: [
    {
      id: "d5-1",
      problemId: 5,
      username: "SnehaReddy",
      initials: "SR",
      content:
        "Key insight: merge from the back. Use three pointers starting at m-1, n-1, and m+n-1. This avoids overwriting elements. O(m+n) time, O(1) space.",
      timestamp: now - 0.3 * DAY,
      upvotes: 26,
    },
    {
      id: "d5-2",
      problemId: 5,
      username: "VivekMishra",
      initials: "VM",
      content:
        "The naive approach of merging from front requires shifting elements right, making it O(m*n). Always merge backwards for optimal solution.",
      timestamp: now - 1.9 * DAY,
      upvotes: 13,
    },
    {
      id: "d5-3",
      problemId: 5,
      username: "DivyaJoshi",
      initials: "DJ",
      content:
        "Don't forget: after the main loop, if nums2 still has remaining elements, copy them over. nums1's remaining elements are already in place.",
      timestamp: now - 3.7 * DAY,
      upvotes: 10,
    },
  ],

  // 6 - Palindrome Number
  6: [
    {
      id: "d6-1",
      problemId: 6,
      username: "RajeshIyer",
      initials: "RI",
      content:
        "Reverse only half the number and compare. When reversed >= original, stop. Handles even/odd digit counts. No string conversion needed. O(log n) time.",
      timestamp: now - 0.6 * DAY,
      upvotes: 21,
    },
    {
      id: "d6-2",
      problemId: 6,
      username: "KavitaSharma",
      initials: "KS",
      content:
        "Quick reject: negative numbers and numbers ending in 0 (except 0 itself) are never palindromes. Saves unnecessary computation.",
      timestamp: now - 2.4 * DAY,
      upvotes: 17,
    },
    {
      id: "d6-3",
      problemId: 6,
      username: "ManojBhat",
      initials: "MB",
      content:
        "Converting to string works but uses O(log n) space. The follow-up asks to solve without string conversion, so practice the math approach.",
      timestamp: now - 5.5 * DAY,
      upvotes: 6,
    },
  ],

  // 7 - Single Number
  7: [
    {
      id: "d7-1",
      problemId: 7,
      username: "NikhilRao",
      initials: "NR",
      content:
        "XOR all elements. Since a ^ a = 0 and a ^ 0 = a, all pairs cancel out leaving the single number. O(n) time, O(1) space. Beautiful bit manipulation.",
      timestamp: now - 0.4 * DAY,
      upvotes: 28,
    },
    {
      id: "d7-2",
      problemId: 7,
      username: "SwatiVerma",
      initials: "SV",
      content:
        "Hash set approach: add if not present, remove if present. Element remaining is the answer. O(n) time but O(n) space. XOR is strictly better.",
      timestamp: now - 1.6 * DAY,
      upvotes: 11,
    },
    {
      id: "d7-3",
      problemId: 7,
      username: "ArunPrakash",
      initials: "AP",
      content:
        "Math trick: 2 * sum(set(nums)) - sum(nums) gives the single number. Works but XOR is more elegant and handles large values better.",
      timestamp: now - 3.9 * DAY,
      upvotes: 9,
    },
  ],

  // 8 - Climbing Stairs
  8: [
    {
      id: "d8-1",
      problemId: 8,
      username: "TanviDesai",
      initials: "TD",
      content:
        "This is literally the Fibonacci sequence! dp[i] = dp[i-1] + dp[i-2]. You only need two variables, so O(n) time and O(1) space.",
      timestamp: now - 0.9 * DAY,
      upvotes: 23,
    },
    {
      id: "d8-2",
      problemId: 8,
      username: "SiddharthMenon",
      initials: "SM",
      content:
        "Top-down with memoization also works. Without memo, the recursion tree has O(2^n) calls. Memoization brings it down to O(n).",
      timestamp: now - 2.1 * DAY,
      upvotes: 14,
    },
    {
      id: "d8-3",
      problemId: 8,
      username: "LakshmiNarayanan",
      initials: "LN",
      content:
        "Fun fact: you can solve this in O(log n) using matrix exponentiation on the Fibonacci matrix [[1,1],[1,0]]. Overkill but great to know.",
      timestamp: now - 4.3 * DAY,
      upvotes: 18,
    },
  ],

  // ===== MEDIUM =====

  // 101 - Add Two Numbers
  101: [
    {
      id: "d101-1",
      problemId: 101,
      username: "GauravKapoor",
      initials: "GK",
      content:
        "Iterate both lists simultaneously, maintain a carry variable. Create new nodes for each digit. Don't forget the final carry - if carry > 0, add one more node.",
      timestamp: now - 0.7 * DAY,
      upvotes: 20,
    },
    {
      id: "d101-2",
      problemId: 101,
      username: "ShrutiMahajan",
      initials: "SM",
      content:
        "Use a dummy head node to simplify the code. It avoids special-casing the first node creation. Return dummy.next at the end.",
      timestamp: now - 1.5 * DAY,
      upvotes: 16,
    },
    {
      id: "d101-3",
      problemId: 101,
      username: "PranavJain",
      initials: "PJ",
      content:
        "The recursive solution is elegant: addTwoNumbers(l1, l2, carry). Base case: both null and carry is 0. O(max(m,n)) time and space.",
      timestamp: now - 3.2 * DAY,
      upvotes: 12,
    },
    {
      id: "d101-4",
      problemId: 101,
      username: "FatimaSyed",
      initials: "FS",
      content:
        "Common mistake: trying to convert lists to integers, add, then convert back. This fails for very long numbers due to integer overflow.",
      timestamp: now - 5.8 * DAY,
      upvotes: 8,
    },
  ],

  // 102 - Longest Substring Without Repeating Characters
  102: [
    {
      id: "d102-1",
      problemId: 102,
      username: "VikramCode",
      initials: "VC",
      content:
        "Sliding window with HashSet. Expand right pointer, if duplicate found shrink from left until duplicate is removed. Track max window size. O(n) time.",
      timestamp: now - 0.5 * DAY,
      upvotes: 18,
    },
    {
      id: "d102-2",
      problemId: 102,
      username: "NehaAlgo",
      initials: "NA",
      content:
        "Using an array of size 128 for ASCII character indices gives O(1) lookup instead of hash set overhead. Store last-seen index for each character.",
      timestamp: now - 1.8 * DAY,
      upvotes: 15,
    },
    {
      id: "d102-3",
      problemId: 102,
      username: "AbhishekTiwari",
      initials: "AT",
      content:
        "Optimized version: use a HashMap to store character -> index. When duplicate found, jump left pointer directly to stored index + 1 instead of shrinking one by one.",
      timestamp: now - 3.0 * DAY,
      upvotes: 22,
    },
    {
      id: "d102-4",
      problemId: 102,
      username: "MeghaChandra",
      initials: "MC",
      content:
        "Watch out for empty string input - should return 0. Also test with all identical characters like 'bbbbb' to make sure your window shrinks correctly.",
      timestamp: now - 6.4 * DAY,
      upvotes: 7,
    },
  ],

  // 103 - Container With Most Water
  103: [
    {
      id: "d103-1",
      problemId: 103,
      username: "RahulBansal",
      initials: "RB",
      content:
        "Two pointers from both ends. Area = min(height[l], height[r]) * (r - l). Move the pointer with the shorter height inward. Greedy choice is provably optimal. O(n) time.",
      timestamp: now - 0.3 * DAY,
      upvotes: 25,
    },
    {
      id: "d103-2",
      problemId: 103,
      username: "IshitaKulkarni",
      initials: "IK",
      content:
        "Why move the shorter side? Because moving the taller side can only decrease or maintain the height (bounded by the shorter one), while the width definitely decreases.",
      timestamp: now - 2.2 * DAY,
      upvotes: 19,
    },
    {
      id: "d103-3",
      problemId: 103,
      username: "SameerDeshpande",
      initials: "SD",
      content:
        "Brute force is O(n^2) checking all pairs. The two-pointer approach eliminates pairs that can't possibly be optimal. Great example of a greedy algorithm.",
      timestamp: now - 4.0 * DAY,
      upvotes: 10,
    },
  ],

  // 104 - 3Sum
  104: [
    {
      id: "d104-1",
      problemId: 104,
      username: "DeepakNambiar",
      initials: "DN",
      content:
        "Sort the array first. Fix one element, then use two pointers on the remaining subarray to find pairs summing to -fixed. O(n^2) time. Sorting is the key enabler.",
      timestamp: now - 0.6 * DAY,
      upvotes: 23,
    },
    {
      id: "d104-2",
      problemId: 104,
      username: "ShaliniPandey",
      initials: "SP",
      content:
        "The hardest part is handling duplicates. Skip duplicate values for the fixed element AND for the two pointers. Otherwise you get duplicate triplets in the result.",
      timestamp: now - 1.4 * DAY,
      upvotes: 20,
    },
    {
      id: "d104-3",
      problemId: 104,
      username: "AkashMehta",
      initials: "AM",
      content:
        "Optimization: if nums[i] > 0, break early since sorted array means no three positive numbers can sum to zero. Helps on large inputs.",
      timestamp: now - 3.5 * DAY,
      upvotes: 14,
    },
    {
      id: "d104-4",
      problemId: 104,
      username: "NidhiAgarwal",
      initials: "NA",
      content:
        "Using a HashSet to avoid duplicates is tempting but adds complexity. The skip-duplicates approach with sorted array is cleaner and doesn't need extra space.",
      timestamp: now - 5.0 * DAY,
      upvotes: 9,
    },
  ],

  // 105 - Binary Tree Level Order Traversal
  105: [
    {
      id: "d105-1",
      problemId: 105,
      username: "VarunSaxena",
      initials: "VS",
      content:
        "Classic BFS with a queue. Process all nodes at current level (queue size at start of iteration), then move to next level. O(n) time and space.",
      timestamp: now - 0.4 * DAY,
      upvotes: 17,
    },
    {
      id: "d105-2",
      problemId: 105,
      username: "AdityaChopra",
      initials: "AC",
      content:
        "DFS approach: pass the level as a parameter. If result array doesn't have a subarray for that level, create one. Append node value to result[level]. Same complexity.",
      timestamp: now - 2.6 * DAY,
      upvotes: 14,
    },
    {
      id: "d105-3",
      problemId: 105,
      username: "KirtiRangan",
      initials: "KR",
      content:
        "The key trick in BFS is capturing queue.length BEFORE the inner loop starts. Otherwise adding children changes the length mid-iteration.",
      timestamp: now - 4.8 * DAY,
      upvotes: 11,
    },
  ],

  // 106 - Number of Islands
  106: [
    {
      id: "d106-1",
      problemId: 106,
      username: "SagarPatil",
      initials: "SP",
      content:
        "DFS flood fill: iterate the grid, when you find a '1', increment count and DFS to mark all connected '1's as '0' (visited). O(m*n) time.",
      timestamp: now - 0.2 * DAY,
      upvotes: 21,
    },
    {
      id: "d106-2",
      problemId: 106,
      username: "AnuradhaKrishnan",
      initials: "AK",
      content:
        "BFS works equally well here. Use a queue to explore neighbors level by level. Union-Find is another approach - great practice for advanced graph problems.",
      timestamp: now - 1.3 * DAY,
      upvotes: 16,
    },
    {
      id: "d106-3",
      problemId: 106,
      username: "OmkarMore",
      initials: "OM",
      content:
        "For DFS, watch out for stack overflow on very large grids. Iterative DFS with explicit stack or BFS avoids this. In interviews, mention this tradeoff.",
      timestamp: now - 3.1 * DAY,
      upvotes: 12,
    },
    {
      id: "d106-4",
      problemId: 106,
      username: "TarunSethi",
      initials: "TS",
      content:
        "Union-Find approach: union adjacent '1' cells. Final count = number of distinct roots among '1' cells. O(m*n * alpha(m*n)) which is nearly linear.",
      timestamp: now - 5.7 * DAY,
      upvotes: 8,
    },
  ],

  // ===== HARD =====

  // 201 - Median of Two Sorted Arrays
  201: [
    {
      id: "d201-1",
      problemId: 201,
      username: "RaviShankar",
      initials: "RS",
      content:
        "Binary search on the smaller array. Partition both arrays such that left half has (m+n+1)/2 elements. Check cross conditions. O(log(min(m,n))) time.",
      timestamp: now - 0.3 * DAY,
      upvotes: 30,
    },
    {
      id: "d201-2",
      problemId: 201,
      username: "SunitaChoudhary",
      initials: "SC",
      content:
        "The intuition: we need to find a cut that divides combined arrays into two equal halves where max(left) <= min(right). Binary search finds this cut efficiently.",
      timestamp: now - 1.9 * DAY,
      upvotes: 24,
    },
    {
      id: "d201-3",
      problemId: 201,
      username: "KarthikSubramanian",
      initials: "KS",
      content:
        "Handle edge cases carefully: one array empty, arrays of length 1, and even/odd total length. Use INT_MIN and INT_MAX for boundary partitions.",
      timestamp: now - 3.4 * DAY,
      upvotes: 15,
    },
    {
      id: "d201-4",
      problemId: 201,
      username: "PreetiBhardwaj",
      initials: "PB",
      content:
        "Merging both arrays and picking median is O(m+n). It works but doesn't meet the O(log(m+n)) requirement. Always clarify constraints in interviews.",
      timestamp: now - 6.1 * DAY,
      upvotes: 10,
    },
  ],

  // 301 - SQL Injection Prevention
  301: [
    {
      id: "d301-1",
      problemId: 301,
      username: "AniketSingh",
      initials: "AS",
      content:
        "Always use parameterized queries / prepared statements instead of string concatenation. This is the gold standard for preventing SQL injection in production.",
      timestamp: now - 0.5 * DAY,
      upvotes: 27,
    },
    {
      id: "d301-2",
      problemId: 301,
      username: "JyotiRaut",
      initials: "JR",
      content:
        "For the sanitization approach: escape single quotes, remove comment sequences (--), and strip UNION/DROP keywords. But remember, sanitization alone is not foolproof.",
      timestamp: now - 2.3 * DAY,
      upvotes: 18,
    },
    {
      id: "d301-3",
      problemId: 301,
      username: "NaveenRajput",
      initials: "NR",
      content:
        "Whitelist validation > blacklist sanitization. Define allowed characters and reject anything else. Blacklists can always be bypassed with encoding tricks.",
      timestamp: now - 4.2 * DAY,
      upvotes: 14,
    },
    {
      id: "d301-4",
      problemId: 301,
      username: "AparnaMukherjee",
      initials: "AM",
      content:
        "Good interview tip: mention defense in depth - input validation, parameterized queries, least privilege DB accounts, and WAF rules. Shows security awareness.",
      timestamp: now - 5.9 * DAY,
      upvotes: 11,
    },
  ],

  // 202 - Trapping Rain Water
  202: [
    {
      id: "d202-1",
      problemId: 202,
      username: "HemantKumar",
      initials: "HK",
      content:
        "Two-pointer approach: track leftMax and rightMax. Water at any position = min(leftMax, rightMax) - height[i]. Move the pointer with the smaller max inward. O(n) time, O(1) space.",
      timestamp: now - 0.4 * DAY,
      upvotes: 29,
    },
    {
      id: "d202-2",
      problemId: 202,
      username: "RekhaPillai",
      initials: "RP",
      content:
        "DP approach: precompute leftMax[] and rightMax[] arrays. Water at i = min(leftMax[i], rightMax[i]) - height[i]. O(n) time and space. Easier to understand first.",
      timestamp: now - 1.6 * DAY,
      upvotes: 20,
    },
    {
      id: "d202-3",
      problemId: 202,
      username: "YashPalTrivedi",
      initials: "YT",
      content:
        "Stack-based solution: maintain a monotonic decreasing stack. When current bar is taller than stack top, pop and calculate trapped water between boundaries. Also O(n).",
      timestamp: now - 3.8 * DAY,
      upvotes: 16,
    },
    {
      id: "d202-4",
      problemId: 202,
      username: "MithilaDas",
      initials: "MD",
      content:
        "I recommend learning all three approaches for this problem. Two-pointer is optimal, DP is most intuitive, and stack approach teaches monotonic stack patterns useful in many problems.",
      timestamp: now - 6.0 * DAY,
      upvotes: 12,
    },
  ],

  // 203 - N-Queens
  203: [
    {
      id: "d203-1",
      problemId: 203,
      username: "BharatRana",
      initials: "BR",
      content:
        "Classic backtracking: place queens row by row. For each row, try each column. Check column, main diagonal (row-col), and anti-diagonal (row+col) conflicts using sets.",
      timestamp: now - 0.6 * DAY,
      upvotes: 22,
    },
    {
      id: "d203-2",
      problemId: 203,
      username: "SaritaThakur",
      initials: "ST",
      content:
        "Key optimization: use three boolean arrays (or sets) for columns, diagonals, and anti-diagonals instead of checking the entire board each time. Reduces per-step check to O(1).",
      timestamp: now - 2.0 * DAY,
      upvotes: 19,
    },
    {
      id: "d203-3",
      problemId: 203,
      username: "RitikMalhotra",
      initials: "RM",
      content:
        "Bitmask approach for competitive programming: use integers to represent occupied columns, diags, and anti-diags. Bit operations are faster than set lookups.",
      timestamp: now - 4.5 * DAY,
      upvotes: 15,
    },
    {
      id: "d203-4",
      problemId: 203,
      username: "PallaviGanguly",
      initials: "PG",
      content:
        "The time complexity is O(n!) in the worst case since each row has fewer valid columns. For n=9, there are only 352 solutions, so it's very manageable.",
      timestamp: now - 5.3 * DAY,
      upvotes: 8,
    },
  ],

  // 204 - Merge K Sorted Lists
  204: [
    {
      id: "d204-1",
      problemId: 204,
      username: "SantoshNaik",
      initials: "SN",
      content:
        "Min-heap (priority queue) approach: push head of each list into heap. Pop minimum, add to result, push its next node. O(N log k) time where N is total elements and k is number of lists.",
      timestamp: now - 0.2 * DAY,
      upvotes: 26,
    },
    {
      id: "d204-2",
      problemId: 204,
      username: "ChitraSubramaniam",
      initials: "CS",
      content:
        "Divide and conquer: pair up lists and merge each pair, repeat until one list remains. Like merge sort on lists. Same O(N log k) complexity but often faster in practice.",
      timestamp: now - 1.7 * DAY,
      upvotes: 21,
    },
    {
      id: "d204-3",
      problemId: 204,
      username: "MohanLal",
      initials: "ML",
      content:
        "Naive approach: merge lists one by one sequentially. This is O(Nk) because each merge operation might traverse all accumulated elements. Heap and D&C are much better.",
      timestamp: now - 3.6 * DAY,
      upvotes: 13,
    },
    {
      id: "d204-4",
      problemId: 204,
      username: "ZaraNadeem",
      initials: "ZN",
      content:
        "In Python, use heapq with (node.val, index, node) tuples to break ties. Without the index, equal values cause comparison errors on ListNode objects.",
      timestamp: now - 5.4 * DAY,
      upvotes: 10,
    },
  ],
};

/**
 * Returns discussion comments for a given problem ID.
 * Falls back to generic comments if no specific data exists.
 */
export function getDiscussions(problemId: number): DiscussionComment[] {
  const existing = mockDiscussions[problemId];
  if (existing) {
    return existing;
  }

  // Determine difficulty for the fallback message
  let difficulty = "Medium";
  if (problemId <= 8) {
    difficulty = "Easy";
  } else if (problemId >= 200) {
    difficulty = "Hard";
  }

  return [
    {
      id: `gen-${problemId}-1`,
      problemId,
      username: "CodeEnthusiast",
      initials: "CE",
      content: `This is a great problem for practicing ${difficulty}-level concepts!`,
      timestamp: now - 1.0 * DAY,
      upvotes: 5,
    },
    {
      id: `gen-${problemId}-2`,
      problemId,
      username: "AlgoLearner",
      initials: "AL",
      content:
        "Try to think about the optimal approach before coding.",
      timestamp: now - 2.5 * DAY,
      upvotes: 3,
    },
  ];
}

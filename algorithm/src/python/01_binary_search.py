# coding=utf-8


# 二分查找
def binary_search(list, item):
    low = 0
    high = len(list) - 1
    while (low <= high):
        mid = (low + high) / 2
        if list[mid] < item:
            low = mid + 1
        elif list[mid] > item:
            high = mid - 1
        else:
            return mid
    return -1


print(binary_search([1, 6, 8, 13, 26, 78], 4))
print(binary_search([1, 6, 8, 13, 26, 78], 8))

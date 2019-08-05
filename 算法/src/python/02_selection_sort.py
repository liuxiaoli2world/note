# coding=utf-8


# 选择排序
def find_smallest(list):
    smallest = list[0]
    smallest_index = 0
    for i in range(1, len(list)):
        if list[i] < smallest:
            smallest = list[i]
            smallest_index = i
    return smallest_index


def selection_sort(list):
    newArr = []
    for i in range(0, len(list)):
        smallest_index = find_smallest(list)
        newArr.append(list.pop(smallest_index))
    return newArr


print(selection_sort([5, 3, 6, 2, 10]))

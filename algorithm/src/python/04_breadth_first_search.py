# coding=utf-8

# 广度优先遍历
from collections import deque


def person_is_seller(name):
    print(name)
    return name[-1] == "m"


graph = {}
graph["you"] = ["alice", "bob", "claire"]
graph["bob"] = ["anuj", "peggy"]
graph["alice"] = ["peggy"]
graph["claire"] = ["thom", "jonny"]
graph["anuj"] = []
graph["peggy"] = []
graph["thom"] = []
graph["jonny"] = []


def breath_first_search(name):
    search_queue = deque()
    search_queue += graph[name]

    searched = []
    while(search_queue):
        person = search_queue.popleft()

        if person not in searched:
            if person_is_seller(person):
                print(person + " is a seller.")
                return True
            else:
                search_queue += graph[person]
                searched.append(person)
    return False


breath_first_search("you")

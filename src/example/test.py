# This is a test file

def bitcount(n):
    count = 0
    while n:
        n ^= n - 1
        count += 1
    return count
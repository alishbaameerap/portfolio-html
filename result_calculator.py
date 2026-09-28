marks = [45, 67, 89, 34, 78]
total = sum(marks)
average = total / len(marks)
print(f"Total: {total}")
print(f"Average: {average:.2f}")
print(f"Highest: {max(marks)}")
print(f"Lowest: {min(marks)}")
if average >= 40:
    print("Result: Pass")
else:
    print("Result: Fail")

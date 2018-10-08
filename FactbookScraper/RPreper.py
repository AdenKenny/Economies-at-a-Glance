import json
import csv

def main():
    ys = []
    xs = []

    with open('data.json', encoding='utf-8') as f:
        data = json.load(f)

        for country in data:
            c_data = data[country]["data"]

            y = c_data["savings"]
            x = c_data["per_capita_ppp"]

            if y is not None and x is not None:

                y = average(y)
                x = average(x)

                if x is None or y is None:
                    continue

                ys.append(y)
                xs.append(x)

    with open('xs.csv', 'w') as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow(xs)

    with open('ys.csv', 'w') as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow(ys)


def average(data):
    data.pop("rank")

    length = len(data)
    total = 0

    for key, value in data.items():
        total += int(value)

    try:
        return int(total / length)
    except ZeroDivisionError:
        return None


main()

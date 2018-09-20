import json


def main():
    with open('data/factbook.json', encoding='utf-8') as f:

        data = json.load(f)

        fields = {}

        countries = data["countries"]
        countries.pop("world", None)

        for country in countries:
            val = stage1(countries[country])
            if val is not None:
                print(val)
                fields[country] = val

        with open('data/data.json', 'w') as outfile:
            json.dump(fields, outfile)


def stage1(raw):
    country = raw["data"]
    economy = country["economy"]

    try:
        continent = country["geography"]["map_references"]
    except KeyError:
        return None

    try:
        gdp = economy["gdp"]
    except KeyError:
        return None

    try:
        labor_force = economy["labor_force"]
    except KeyError:
        labor_force = None

    try:
        unemployment = economy["unemployment_rate"]
    except KeyError:
        unemployment = None

    try:
        gini = economy["distribution_of_family_income"]
    except KeyError:
        gini = None

    try:
        savings = economy["gross_national_saving"]
    except KeyError:
        savings = None

    try:
        population_below_poverty_line = economy["population_below_poverty_line"]
    except KeyError:
        population_below_poverty_line = None

    try:
        household_income_by_percentage_share = economy["household_income_by_percentage_share"]
    except KeyError:
        household_income_by_percentage_share = None

    try:
        public_debt = economy["public_debt"]
    except KeyError:
        public_debt = None

    try:
        ppp = gdp["purchasing_power_parity"]
    except KeyError:
        ppp = None

    try:
        per_capita_ppp = gdp["per_capita_ppp"]
    except KeyError:
        per_capita_ppp = None

    try:
        composition = gdp["composition"]["by_sector_of_origin"]
    except KeyError:
        composition = None

    try:
        inflation = economy["inflation_rate"]
    except KeyError:
        inflation = None

    try:
        budget = economy["budget"]
    except KeyError:
        budget = None

    try:
        growth_rate = gdp["real_growth_rate"]
    except KeyError:
        growth_rate = None

    try:
        population_data = country["people"]["population"]

        population = {
            "total": population_data["total"],
            "global_rank": population_data["global_rank"]
        }
    except KeyError:
        population = None

    fields = {
        "name": country['name'],
        "continent": continent,
        "data": {
            "population": population,
            "ppp": ppp,
            "growth_rate": growth_rate,
            "per_capita_ppp": per_capita_ppp,
            "sector_of_origin": composition,
            "savings": savings,
            "labor_force": labor_force,
            "unemployment": unemployment,
            "population_below_poverty_line": population_below_poverty_line,
            "household_income_by_percentage_share": household_income_by_percentage_share,
            "gini": gini,
            "budget": budget,
            "public_debt": public_debt,
            "inflation": inflation,
        },
    }

    return stage2(fields)


def stage2(raw):

    data = raw["data"]
    labor_force = data["labor_force"]

    try:
        population_below_poverty_line = data["population_below_poverty_line"]["value"]
    except TypeError:
        population_below_poverty_line = None

    try:
        household_income_by_percentage_share = {
            "lowest_10": data["household_income_by_percentage_share"]["lowest_ten_percent"]["value"],
            "highest_10": data["household_income_by_percentage_share"]["highest_ten_percent"]["value"],
        }
    except TypeError:
        household_income_by_percentage_share = None

    try:
        occupation = labor_force["by_occupation"]["occupation"]
    except KeyError:
        occupation = None
    except TypeError:
        occupation = None

    try:
        public_debt = data["public_debt"]
    except KeyError:
        public_debt = None

    try:
        inflation = data["inflation"]
    except KeyError:
        inflation = None

    try:
        gdp_by_sector = parse_sectors(data["sector_of_origin"]["sectors"])
    except TypeError:
        gdp_by_sector = None
    except KeyError:
        gdp_by_sector = None

    try:
        labor_force = {
            "total_people": labor_force["total_size"]["total_people"],
            "global_rank": labor_force["total_size"]["global_rank"],
            "by_occupation": parse_sectors(occupation)
        }
    except KeyError:
        labor_force = None
    except TypeError:
        labor_force = None

    try:
        revenue = data["budget"]["revenues"]["value"]
    except KeyError:
        revenue = None
    except TypeError:
        revenue = None

    try:
        expenditure = data["budget"]["expenditures"]["value"]
    except KeyError:
        expenditure = None
    except TypeError:
        expenditure = None

    fields = {
        "name": raw["name"],
        "region": raw["continent"],
        "data": {
            "population": data["population"],
            "ppp": parse_value(data["ppp"]),
            "growth_rate": parse_value(data["growth_rate"]),
            "per_capita_ppp": parse_value(data["per_capita_ppp"]),
            "gdp_by_sector": gdp_by_sector,
            "savings": parse_value(data["savings"]),
            "labor_force": labor_force,
            "unemployment": parse_value(data["unemployment"]),
            "population_below_poverty_line": population_below_poverty_line,
            "household_income_by_percentage_share": household_income_by_percentage_share,
            "gini": parse_value(data["gini"]),
            "budget": {
                "revenue": revenue,
                "expenditure": expenditure
            },
            "public_debt": parse_value(public_debt),
            "inflation": parse_value(inflation)
        }
    }

    return fields


def parse_sectors(data):

    if data is None:
        return None

    fields = {
    }

    for e in data:
        fields[e] = data[e]["value"]

    return fields


def parse_value(data):

    if data is None:
        return None

    try:
        rank = data["global_rank"]
    except KeyError:
        rank = None

    fields = {
        "rank": rank,
    }

    try:
        for e in data["annual_values"]:
            try:
                fields[e["date"]] = e["value"]
            except KeyError:
                pass
    except KeyError:
        pass

    return fields

def coords:
    with open('data/custom50.json', encoding='utf-8') as f:
    data = json.load(f)

    for e in data["features"]:
        try:
            coords = e["geometry"]["coordinates"]
            for coord in coords:
                for coord2 in coord:
                    for coord3 in coord2:
                        coord3[0] = "{0:.2f}".format(coord3[0])
                        coord3[1] = "{0:.2f}".format(coord3[1])

        except TypeError:
            continue

    with open('data/coordsData.json', 'w') as outfile:
        json.dump(data, outfile)


main()

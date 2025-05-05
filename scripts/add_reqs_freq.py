# Add request frequency as a property to the country geoojson
import pandas as pd

if __name__ == "__main__":
    import json
    import os

    # Load the country geojson
    with open("globe.gl/countries.json", "r") as f:
        countries = json.load(f)

    cfreq = pd.read_csv("reqs_pr_country_for_20250430.csv")
    # Load the request frequency data from the CSV file
    # req_freq = {}
    # with open("reqs_pr_country_for_20250430.csv", "r") as f:
    #     for line in f:
    #         country_code, frequency = line.strip().split(",")
    #         req_freq[country_code] = int(frequency)
    
    # Add the request frequency to the country geojson
    for feature in countries["features"]:
        country_code = feature["properties"]["ISO_A2"]
        if country_code in cfreq["CountryAlpha2"].values:
            feature["properties"]["req_freq"] = int(cfreq.loc[cfreq["CountryAlpha2"] == country_code, "Count"].iloc[0])
        else:
            feature["properties"]["req_freq"] = 0

    # Save the updated geojson
    with open("globe.gl/countries_with_req_freq.json", "w") as f:
        json.dump(countries, f)
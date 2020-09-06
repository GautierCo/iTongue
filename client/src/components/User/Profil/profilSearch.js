import React, { useState, useEffect } from "react";
import { Dropdown, Input } from "semantic-ui-react";
import "./userprofil.scss";

const ProfilSearch = ({ records, inputSearch, setInputSearch }) => {
    const handdleChange = (e, data) => {
        setInputSearch({
            search: e.target.name === "search" ? e.target.value : inputSearch.search,
            lang: data.name === "lang" ? data.value : inputSearch.lang,
        });
    };

    const languages =
        records &&
        records.map((record) => {
            return record.translation.language;
        });

    const filterLanguages = Array.from(
        new Set(languages && languages.map((language) => language.id))
    ).map((id) => {
        return languages.find((lang) => lang.id === id);
    });

    const optionsLanguages = filterLanguages.map((language) => {
        return {
            key: language.id,
            value: language.id,
            text: language.name,
            image: `https://www.countryflags.io/${language.code}/flat/32.png`,
        };
    });

    return (
        <div className="profil-search">
            <Input
                placeholder={"Search.."}
                value={inputSearch.search}
                onChange={handdleChange}
                size={"small"}
                name="search"
                icon="search"
            />
            <Dropdown
                selection
                placeholder="Languages"
                name="lang"
                options={optionsLanguages}
                onChange={handdleChange}
                minCharacters={0}
                clearable
            />
        </div>
    );
};

export default ProfilSearch;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  sort?: string;
  load: Function;
}

export const useQueryString = ({ load, sort = "created_at" }: Props) => {
  const [filters, setFilters] = useState<any>({ sort });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    load(location.search);
    readQueryString();
  }, [location.search]);

  const readQueryString = () => {
    let qsFilters = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (!qsFilters["sort"]) {
      qsFilters["sort"] = sort;
    }

    console.log({ qsFilters }, location.search);

    setFilters({ ...qsFilters });
  };

  const onFilterChange = ({ name, value }: { name: string; value: string }) => {
    let newState = { ...filters };
    newState.page = 1;

    if (!value) {
      delete newState[name];
    } else {
      newState[name] = value;
    }

    confirmFilters(newState);
  };

  // useEffect(() => {
  //   confirmFilters({ ...prevState });
  // }, [filters]);

  const confirmFilters = (data: any) => {
    pushHistory(data || filters);
  };

  const pushHistory = (filters: any) => {
    let query = { ...filters };

    // for (let key in query) {
    //   if (Array.isArray(query[key])) {
    //     if (query[key].length === 0) delete query[key];
    //   } else {
    //     if (
    //       query[key] === null ||
    //       query[key] === undefined ||
    //       query[key] === ""
    //     )
    //       delete query[key];
    //   }
    // }

    let queryString = qs.stringify(query, {
      addQueryPrefix: true,
      skipNulls: true,
    });

    navigate({ search: queryString });
  };

  return { filters, onFilterChange };
};

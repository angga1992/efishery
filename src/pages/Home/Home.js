import React, { useEffect, Fragment, useState } from "react";
import { DataTable, TopBar } from "../../components/elements";
import { getData } from '../../fetcher';
import { Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const LoadingBar = withStyles({
  colorPrimary: {
    backgroundColor: 'blue',
  },
  barColorPrimary: {
    backgroundColor: 'rgb(42 149 189)',
  },
})(LinearProgress);

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getData();
    const newData = Array.from(new Set(data.map(i => i.id)))
      .filter(i => i)
      .map(i => data.find(item => item.id === i));

    setData(newData);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const dataFiltered = data.filter(item => {
    const komoditas = `${item.komoditas}`;
    if (komoditas.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });

  return (
    <Fragment>
      <TopBar setData={setData} data={data} handleSearch={handleSearch} />
      {data.length === 0
        ? <LoadingBar />
        : <Grid key={data.index}>
          <DataTable data={dataFiltered} setData={setData} />
        </Grid>}
    </Fragment>
  );
}

export default Home;

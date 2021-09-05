import './App.css';
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import { BasicTable } from './components/basicTable';
import { BasicSortTable } from './components/sortTable';
import { GlobalFilterTable } from './components/globalFilterTable';
import { PaginateTable } from './components/PaginateTable';

function App() {
  return (

    <Router >
      <div className="App">

        <Link to="/sort-table">Sorted Table</Link>
        <span> | </span>
        <Link to="/">Table</Link>
        <span> | </span>
        <Link to="/filter-table">Filtered Table</Link>
        <span> | </span>
        <Link to="/paginate-table">Paginated Table</Link>

        <Switch>

          <Route exact path="/">
            <BasicTable />
          </Route>

          <Route path="/sort-table">
            <BasicSortTable />
          </Route>

          <Router path="/filter-table">
            <GlobalFilterTable />
          </Router>

          <Router path="/paginate-table">
            <PaginateTable />
          </Router>


        </Switch>

      </div>
    </Router>
  );
}

export default App;

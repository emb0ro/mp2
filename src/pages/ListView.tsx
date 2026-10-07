import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Meal } from '../types';

function ListView() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            .then((response) => {
                setMeals(response.data.meals || []);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [search]);

    const filteredMeals = [...meals]
        .sort((a, b) => {
            let comp = 0;
            if (sortBy ==='name') {
                comp = a.strMeal.localeCompare(b.strMeal);
            } else if (sortBy === 'category') {
                comp = a.strCategory.localeCompare(b.strCategory);
            }
            if (sortOrder === 'desc') {
                comp = comp * -1;
            }
            return comp;
    });

    const sortedMeals = [...filteredMeals].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.strMeal.localeCompare(b.strMeal)
                : b.strMeal.localeCompare(a.strMeal);
        }
        if (sortBy === 'category') {
            return sortOrder === 'asc'
                ? a.strCategory.localeCompare(b.strCategory)
                : b.strCategory.localeCompare(a.strCategory);
        }
        return 0;
    });

    return (
        <div className="list-view">
            <h2 className="list-title">Meal List</h2>
            {/* Copilot auto-filled lines 54-59*/}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search meals..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="category">Category</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <ul className="meal-list">
                {filteredMeals.map((meal) => (
                    <li className="meal-card" key={meal.idMeal}>
                        <Link to={`/meal/${meal.idMeal}`}>
                            <h3>{meal.strMeal}</h3>
                        </Link>
                        <p>Category: {meal.strCategory}</p>
                        <p>Cuisine: {meal.strArea || 'Not specified'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListView;
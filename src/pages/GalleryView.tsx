import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface GalleryMeal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

function GalleryView() {
    const [meals, setMeals] = useState<GalleryMeal[]>([]);
    const [category, setCategory] = useState('Chicken');

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((response) => {
            setMeals(response.data.meals);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [category]);

    return (
        <div className="gallery-page">
            <h2>Meal Gallery</h2>
            <p>Browse meals by category.</p>

            <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            >
                <option value="Beef">Beef</option>
                <option value="Chicken">Chicken</option>
                <option value="Dessert">Dessert</option>
                <option value="Pasta">Pasta</option>
                <option value="Seafood">Seafood</option>
                <option value="Vegetarian">Vegetarian</option>
            </select>

            <div className="gallery-grid">
                {meals.map((meal) => (
                    <Link
                        key={meal.idMeal}
                        to={`/meal/${meal.idMeal}`}
                    >
                        <div className="gallery-card">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                width="200"
                            />
                            <h3>{meal.strMeal}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GalleryView;
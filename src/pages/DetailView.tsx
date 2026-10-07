import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Meal } from '../types';

function DetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [mealList, setMealList] = useState<Meal[]>([]);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => {
            setMeal(response.data.meals[0]);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);

    useEffect(() => {
        if (meal !== null) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`).then((response) => {
                setMealList(response.data.meals || []);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [meal]);

    const currIndex = mealList.findIndex((item) => item.idMeal === id);

    const handlePrev = () => {
        if (currIndex !== -1 && mealList.length > 0) {
            let prevIndex = currIndex - 1;

            if (prevIndex < 0) {
                prevIndex = mealList.length - 1;
            }

            const prevMeal = mealList[prevIndex];
            navigate(`/meal/${prevMeal.idMeal}`);
        }
    }

    const handleNext = () => {
        if (currIndex !== -1 && mealList.length > 0) {

            let nextIndex = currIndex + 1;

            if (nextIndex >= mealList.length) {
                nextIndex = 0;
            }

            const nextMeal = mealList[nextIndex];
            navigate(`/meal/${nextMeal.idMeal}`);
        }
    }

    if (meal === null) {
        return <p>Loading...</p>;
    }

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                ingredient: ingredient,
                measure: measure
            });
        }
    }


    return (
        <div className="detail-page">
            <h2>{meal.strMeal}</h2>

            <img
                className="detail-image"
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width="300"
            />

            <p>Category: {meal.strCategory}</p>
            <p>Cuisine: {meal.strArea || 'Not specified'}</p>

            <h3>Ingredients</h3>
            <ul className="ingredient-list">
                {ingredients.map((item, index) => (
                    <li key={index}>
                        <span>{item.ingredient}</span>
                        <span>{item.measure}</span>
                    </li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <p>{meal.strInstructions}</p>

            <div className="detail-buttons">
                <button
                    onClick={handlePrev}
                    disabled={mealList.length === 0}
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={mealList.length === 0}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DetailView;
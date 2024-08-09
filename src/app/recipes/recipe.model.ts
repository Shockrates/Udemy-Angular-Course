import { Ingredient } from "../shared/models/ingredient.model";

export class Recipe {
    // public name: string;
    // public description: string;
    // public imagePath: string;

    constructor( 
        public name: string,
        public description: string,
        public imagePath: string,
        public ingredients: Ingredient[]
    ){}
}
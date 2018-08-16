import { FormControl, Validators } from '@angular/forms';

// export class Nutrition {
//     constructor(public name: string, public amount: number, public unit: string) {}
// }

export class Nutrition {
  constructor(
    public calories: number,
    public fat: number,
    public saturates: number,
    public protein: number,
    public carbs: number,
    public sugar: number,
    public salt: number,
    public fibre: number
  ) {}
}

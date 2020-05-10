import Decimal from "break_infinity.js";

export class Rules{
    public static earnings (level:number, category:number, dt:number):Decimal{
        //(UpgradeLevel) * (BuildingCategory ^ 5.6)
        return new Decimal(level).multiply(((category + 1)  ** 5.6)).multiply(dt);
    }

    private static cost (level:number, category:number):Decimal{
        //(2*BuildingCategory ^ 5.6) * (UpgradeLevel^2.5)
        return new Decimal(category+1).pow(5.6).multiply(2).multiply(level**2.5)
    }

    public static recursiveCost (currentLevel:number, category:number, levelsToIncrease:number)
    {
        let retval = new Decimal(0);
        for (let i = 0; i < levelsToIncrease; i++) {
            retval = retval.add(Rules.cost(currentLevel+i+1,category))
        }
        return retval;
    }

    public static str(number:Decimal):string{
        if (number.lessThan(1000))
        {
            return number.trunc().toString();
        }
        else if (number.lessThan(1000000))
        {
            return number.dividedBy(1000).toFixed(1) + "k";
        }
        else if (number.lessThan(1000000000))
        {
            return number.dividedBy(1000000).toFixed(1).toString() + "m";
        }
        else
        {
            return number.toExponential(1);
        }
    }
}

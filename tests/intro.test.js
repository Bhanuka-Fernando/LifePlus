import { describe, test, it, expect } from "vitest";
import { max } from "../TestingTests/intro";


describe('max', () => {
    it('should return the first argument if it is greater',()=>{
        //Arrange
        const a = 2;
        const b = 1;

        //Act
        const result = max(a,b);

        //Assert
        expect(result).toBe(2);


    });

    it('should return the second argument if it is greater',()=>{
        //Arrange
        expect(max(1,2)).toBe(2);


    });

})
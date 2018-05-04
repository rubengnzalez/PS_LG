
EJERCICIO 1:

This exercise has been implemented in order to find the most efficient way of calculating divisors and then classifying.
The first approach used range(N) built-in function, which returns an array of N-1 positions. It is an easy way of iterate through a loop but it is not efficient (neither space nor time/iterations) on high values. It was replaced to an auto-incremental variable, which does not require too many space as storing all array positions does. 

Then, after making some analysis on divisors calculation I realized that N/2 would be the highest divisor of N:
    - If N%2 == 0, it means that highest divisor would be N/2.
    - If N%3 == 0, it means that highest divisor would be N/3 (which is lower than example above)...
... so, WHY TO ITERATE [1 .. N] if [1.. N/2] would return the same result by apply much less iterations?

In addition, I would have liked to implement a more efficient way to calculate divisors, by using only prime numbers:
For instance, to calculate divisors of 36:
    - Current implementation would need 18 iterations (max)
    - More last approach would require only 4 iterations:
    36  /  2
    18  /  2
    9  /  3
    3  /  3
    1

It would be appreciated for high numbers.



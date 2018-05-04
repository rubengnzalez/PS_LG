
# -*- coding: utf-8 -*-


def classifyByDivisors(*numbersList):
    """ This function classifies an integer depending on wether it is deficient (-1), perfect (0) or abundant (1)"""
    numbersClasif = []
    if not numbersList:
        print "ERROR - No arguments received."
        return numbersClasif
    else:
        print "INFO - Received the following list of numbers:", numbersList
        for item in numbersList:
            if not isinstance(item, (int, long)):
                numbersClasif.append(None)
            else:
                sum = 0
                i = 1
                while i < (item/2 +1):
                    if item%i == 0:
                        sum += i
                    i += 1

                print "item:", item, "sum:", sum
                numbersClasif.append("deficient") if sum < item else None
                numbersClasif.append("perfect") if sum == item else None
                numbersClasif.append("abundant") if sum > item else None
        return numbersClasif


if __name__ == "__main__":

    print classifyByDivisors(18, 6, 2, 28, 28562100, 2.35, "ere")

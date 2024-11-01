## Notes:

* I created exactly what was asked for in the challenge, there are other possible scenarios for the response codes;
* I put a loop in the request limit reached test (429), but we could also use two different tokens;
* Two tests fail, which in this case would be tickets that need to be fixed:

400 => The parameter type is incorrect, the documentation clearly says it is a string, however, a boolean was accepted:
```
Code: 200 | Response: {
    "code": 201,
    "type": "invalid_base_currency"
}
```

404 => The route provided does not exist, there was a typo on purpose to force the error:
```
Code: 200 | Response: {
    "code": 201,
    "type": "invalid_base_currency"
}
```
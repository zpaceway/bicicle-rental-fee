El siguiente proyecto representa un microservicio de alquiler de bicicletas, en el cual se recibe un usuario que alquila una bicicleta por un número determinado de horas.

El sistema tiene las siguientes condiciones:

```
<= 1 hora: $2
<= 3 horas: $5
<= 6 horas: $9
<= 12 horas: $15
> 12 horas: No es posible procesar esta entrada
```

El controlador al igual que el servicio debe entregar la orden procesada con su valor de comisión de renta (rentalFee) en el siguiente formato

{
    "id": "string",
    "userId": "string",
    "hours": "number",
    "rentalFee": "number"
}

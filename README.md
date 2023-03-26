# Práctica 7 - DeStravate

Esta práctica, que es la primera práctica grupal de la asignatura, consiste en la creación de un sistema que permite llevar un registro de actividades deportivas de los usuarios. El sistema debe permitir diferentes funcionalidades y elementos que comentaremos a continuación.

## Descrición de los requisitos del sistema

El sistema contará con diferentes tipos de datos, que son los siguientes:

*Rutas
*Usuarios
*Grupos
*Retos 

Cada uno de estos, tienen distinta información y características, que se explican a profundidad en el [guión de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/).

### Funcionamiento
El funcionamiento del sistema debe funcionar con por lo menos los siguientes requisitos:
* 10 rutas distintas
* 20 usuarios distintos
* 5 grupos distintos
* 3 retos distintos

Para la gestión del sistema, se hará uso de un menú o linea de comandos interactiva, que permita al usuario realizar las distintas acciones que tenga el sistema. Debido a esto se debe utilizar el módulo `Inquirer.js` para la gestión de la interacción con el usuario. Además toda la información del sistema debe ser guardada y persistir, para esto se hace uso del paquete `lowdb` que permite guardar la información en un archivo JSON.

Otro aspecto de la gestión del sistema es que se debe poder navegar la informacion de las entidades. Para cada tipo, osea para usuarios, rutas, grupos y retos, se debe poder mostrar la información y ordenarla de diferentes formas, por ejemplo en las Rutas se debe poder mostrar de alfabéticamente por nombre de la ruta, ascendente y descendente, también por cantidad de usuarios que realizan las rutas, ascendente y descendente, entre otras, la especificación completa de los requisitos se encuentra en el [guión de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/).

### Clase Gestor
Se debe crear una clase gestor para el tratamiento de la información del sistema. Esta clase también contará con un menú de interacción con el usuario, que permita realizar las distintas acciones que se requieren para el sistema. Esta clase debe tener la siguiente funcionalidad:

* Registrarse en el sistema, iniciar sesión, visualizar la lista de usuarios y añadir/eliminar amigos.
* Visuaizar las rutas del sistema y acceder a toda la informacion de ellas
* Unirse a un grupo
* Visualizar, crear y borrar grupos, pero solo los crados por el usuario

De nuevo, toda la información detallada de los requisitos del sistema, se encuentra en el [guión de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/).

## Implementación
### Estructura del proyecto
El proyecto se ha estructurado de la siguiente manera:

* `src` - Carpeta que contiene el código fuente del proyecto
  * `src/modelos` - Carpeta que contiene los archivos de los modelos o entidades del sistema (usuarios, rutas, grupos y retos)
  * `src/coleccion` - Carpeta que contiene los archivos de las clases de las colecciones de los modelos (usuarios, rutas, grupos y retos) que permiten la gestión de 
  * `src/jsonModifiers` - Carpeta que contiene los archivos que modifican los archivos JSON de los modelos (usuarios, rutas, grupos y retos) para añadir, modificar o eliminar información y que esta persista tras la ejecución del programa
  * `src/interfaces` - Carpeta que contiene los archivos de las interfaces utilizadas en el proyecto
  * `src/enums` - Carpeta que contiene los archivos de los enumerados utilizados en el proyecto
  * `src/app.ts` - Archivo principal del proyecto, que contiene la clase Gestor y toda la funcionalidad en si del sistema que permite la interacción con el usuario.

* `database` - Carpeta que contiene los archivos JSON con la información de los modelos (usuarios, rutas, grupos y retos)

* `tests` - Carpeta que contiene los archivos de los tests del proyecto (los tests se han realizado con el framework `Mocha` y la librería `Chai`) 

Esta es la estructura del proyecto, decidimos hacerlo de esta forma, para organizar el código por funcionalidades y tenerlo todo más ordenado. Además se ha intentado seguir los principios SOLID, para que el código sea más mantenible y escalable. 

### Interfaces 

Para la implementación de las interfaces, se ha creado una carpeta llamada `interfaces` dentro de la carpeta `src`, en la que se encuentran los archivos de cada una de las interfaces. Estos archivos contienen la definición de las interfaces que se utilizan en el proyecto.

#### EntidadInterface

Esta interfaz se utiliza para definir los métodos que se requieren para la gestión de las entidades (usuarios, rutas, grupos y retos). Esta interfaz contiene los siguientes métodos:

```typescript
export interface EntidadInterface {
  id: number;
  nombre: string;
}
```

La interfaz consta de dos atributos, el `id` y el `nombre`, que son los atributos que se requieren en comun para todos las entidades o modelos del sistema.

#### ColeccionInterface

Esta interfaz se utiliza para definir los métodos que se requieren para la gestión de las colecciones de las entidades (usuarios, rutas, grupos y retos). Esta interfaz contiene los siguientes métodos:

```typescript

### Modelos o Entidades

Para la implementación de los modelos o entidades, se ha creado una carpeta llamada `modelos` dentro de la carpeta `src`, en la que se encuentran los archivos de cada uno de los modelos. Estos archivos contienen la definición de las clases que representan a cada uno de los modelos (usuarios, rutas, grupos y retos) y los métodos que se requieren para su funcionamiento.

#### Usuarios

La clase `Usuario` contiene la información de cada uno de los usuarios del sistema. Esta clase contiene los siguientes atributos:

```typescript
class Usuario implements EntidadInterface {
  id: number;
  nombre: string;
  contraseña: string;
  actividades: Actividad; // deberia ser un array de actividades
  amigosApp: number[] = [];
  amigosFrecuentes: number[] = [];
  estadisticas: EstadisticasEntrenamiento = ESTADISTICASNULL
  rutasFavoritas: number[] = [];
  retosActivos: number[] = [];
  historicoRutas: { ruta: number; fecha: string; }[] = [];
```

Se puede apreciar que ciertos atributos se inicializan con un valor por defecto, esto se hace porque no se pasan por parámetro en el constructor, ya que estos atributos se van modificando a lo largo de la ejecución del sistema y cuando se va agregando información a los usuarios.



## Conclusiones

## Referencias


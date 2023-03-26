[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupok/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupok?branch=master)

# Práctica 7 - DeStravate

Esta práctica, que es la primera práctica grupal de la asignatura, consiste en la creación de un sistema que permite llevar un registro de actividades deportivas de los usuarios. El sistema debe permitir diferentes funcionalidades y elementos que comentaremos a continuación.

## Descrición de los requisitos del sistema

El sistema contará con diferentes tipos de datos, que son los siguientes:

* Rutas
* Usuarios
* Grupos
* Retos 

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
interface Coleccion<T> {
  insertar(elemento: T): void;
  eliminar(elemento: T): void;
  listar(): void;
}
```

La interfaz consta de tres métodos, `insertar`, `eliminar` y `listar`, que son los métodos que deben implementar las clases de las colecciones de las entidades o modelos del sistema. Estos métodos permiten añadir, eliminar y listar los elementos de la colección.

#### CoordenadasInterface

Esta interfaz define los atributos que debe tener un objeto que contenga las coordenadas de una ruta. Esta interfaz contiene los siguientes atributos:

```typescript
interface CoordenadasInterface {
  latitud: number;
  longitud: number;
}
```

La interfaz consta de dos atributos, la `latitud` y la `longitud`, que son los atributos que se requieren para definir las coordenadas de una ruta. Por ejemplo las coordenadas de una ruta pueden ser: `{ latitud: 40.4167754, longitud: -3.7037902 }`

#### EstadisticasEntrenamientoInterface

Esta interfaz define los atributos que debe tener un objeto que contenga las estadísticas de un usuario. Esta interfaz contiene los siguientes atributos:

```typescript
interface EstadisticasEntrenamiento {
  semana: { km: number; desnivel: number };
  mes: { km: number; desnivel: number };
  anio: { km: number; desnivel: number };
}
```

La interfaz consta de tres atributos, `semana`, `mes` y `anio`, que son los atributos que se requieren para definir las estadísticas de un usuario. Por ejemplo las estadísticas de un usuario pueden ser: `{ semana: { km: 10, desnivel: 100 }, mes: { km: 20, desnivel: 200 }, anio: { km: 30, desnivel: 300 } }`

### Enumerados

Para la implementación de los enumerados, se ha creado una carpeta llamada `enums` dentro de la carpeta `src`, en la que se encuentran los archivos de cada uno de los enumerados. Estos archivos contienen la definición de los enumerados que se utilizan en el proyecto.

#### Tipo de Actividad

Este enumerado define los tipos de actividad que puede tener una ruta o actiividad del sistema. Este enumerado contiene los siguientes valores:

```typescript
export enum Actividad {
  ciclismo = 'ciclismo',
  running = 'running',
}
```

El enumerado consta de dos valores, `ciclismo` y `running`, que son los tipos de actividad que puede tener una ruta.

#### Dificultad 

Este enumerado define las dificultades que puede tener una ruta o actiividad del sistema. Este enumerado contiene los siguientes valores:

```typescript
enum Dificultad {
  facil = 'facil',
  media = 'media',
  dificil = 'dificil',
}
```

El enumerado consta de tres valores, `facil`, `media` y `dificil`, que son las posibles dificultades que puede tener una ruta. Se optó por un enumerado en vez de un alias de tipo, ya que se consideró que al ser sencillo y con valores predefinidos, era más adecuado utilizar un enumerado.

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

Cabe resaltar que la clase `Usuario` implementa la interfaz `EntidadInterface`, por lo que debe implementar los métodos que se definen en esta interfaz que comentamos previamente.

El constructor de la clase es el siguiente:

```typescript
  constructor(nombre: string, contraseña: string, actividades: Actividad) {
    /// Comprobamos que el nombre no esté vacío y que la actividad sea válida
    if (nombre === '') {
      throw new Error('Nombre de usuario vacío');
    }
    if (this.isValidPassword(contraseña) === false) {
      throw new Error('Contraseña no válida');
    }
    contador_id++;
    this.id = contador_id;
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.actividades = actividades;
  }
```

En el constructor se comprueba que el nombre no esté vacío y que la contraseña tenga un formato válido, este formato se define en el método `isValidPassword` que se encuentra en la clase `Usuario` y que basicamente comprueba que la contraseña tenga al menos una letra mayúscula, una minúscula, un número y un carácter especial. Si la contraseña no tiene un formato válido se lanza una excepción. Además, se incrementa el contador de identificadores y se asigna el valor del contador al atributo `id` del usuario, esto se hace de esta forma para que al crear un usuario se le asigne un identificador único. Por último, se asignan los valores de los parámetros al resto de atributos de la clase.

La clase contiene tambien getters y setters para todos los atributos de la clase, además de ciertos métodos para modificar algunos elementos de los atributos de la clase. como son:

* `addAmigoApp` y `eraseAmigoApp`: Estos métodos permiten añadir y eliminar amigos de la aplicación a la lista de amigos de la aplicación del usuario.

* `addRutaFavorita` y `eraseRutaFavorita`: Estos métodos permiten añadir y eliminar rutas a la lista de rutas favoritas del usuario.

* `addRetoActivo` y `eraseRetoActivo`: Estos métodos permiten añadir y eliminar retos a la lista de retos activos del usuario.


#### Rutas

La clase `Ruta` contiene la información de las rutas que se pueden realizar en el sistema. Esta clase contiene los siguientes atributos:

```typescript
class Ruta implements EntidadInterface {
  id: number;
  nombre: string;
  coordenadasInicio: Coordenadas;
  coordenadasFin: Coordenadas;
  longitud: number;
  desnivel: number;
  usuariosVisitantes: number[] = [];
  tipoActividad: Actividad;
  dificultad: Dificultad;
  calificacion: number = 0;
```

Se puede apreciar que ciertos atributos se inicializan con un valor por defecto, esto se hace porque no se pasan por parámetro en el constructor, ya que estos atributos se van modificando a lo largo de la ejecución del sistema y cuando se va agregando información a las rutas.

Cabe resaltar que la clase `Ruta` implementa la interfaz `EntidadInterface`, por lo que debe implementar los métodos que se definen en esta interfaz que comentamos previamente.

El constructor de la clase es el siguiente:

```typescript
  constructor(
    nombre: string, 
    coordenadasInicio: Coordenadas, 
    coordenadasFin: Coordenadas, 
    longitud: number, 
    desnivel: number, 
    tipoActividad: Actividad,
    dificultad: Dificultad) 
    {
      contador_id++;
      this.id = contador_id;
      this.nombre = nombre;
      this.coordenadasInicio = coordenadasInicio;
      this.coordenadasFin = coordenadasFin;
      this.longitud = longitud;
      this.desnivel = desnivel;
      this.tipoActividad = tipoActividad;
      this.dificultad = dificultad;

      // Ponemos una calificación aleatoria entre 0 y 5
      this.calificacion = Math.floor(Math.random() * 6);
    }    
```

En el constructor se incrementa el contador de identificadores y se asigna el valor del contador al atributo `id` de la ruta, esto se hace de esta forma para que al crear una ruta se le asigne un identificador único. Por último, se asignan los valores de los parámetros al resto de atributos de la clase.

La clase contiene tambien getters y setters para todos los atributos de la clase, además de ciertos métodos para modificar algunos elementos de los atributos de la clase. como son:

* `addUsuarioVisitante` y `eraseUsuarioVisitante`: Estos métodos permiten añadir y eliminar usuarios a la lista de usuarios visitantes de la ruta.

#### Grupos

La clase `Grupo` contiene la información de los grupos que se pueden crear en el sistema. Un grupo de usuarios engloba la información de los usuarios que se unen para realizar rutas juntos. Esta clase contiene los siguientes atributos:

```typescript
class Grupo implements EntidadInterface {
  id: number;
  nombre: string;
  creador: number;
  participantes: number[] = [];
  estadisticasEntrenamiento: EstadisticasEntrenamiento = EMPTY_ESTADISTICAS_ENTRENAMIENTO;
  clasificacion: { id: number; km: number; desnivel: number }[] = [];
  rutasFavoritas: number[] = [];
  historicoRutas: { ruta: number; fecha: string; }[] = [];
...
```

Se puede apreciar que ciertos atributos se inicializan con un valor por defecto, esto se hace porque no se pasan por parámetro en el constructor, ya que estos atributos se van modificando a lo largo de la ejecución del sistema y cuando se va agregando información a los grupos. EMPTY_ESTADISTICAS_ENTRENAMIENTO es una constante que se define en el fichero `constantes.ts` y que contiene un objeto de tipo `EstadisticasEntrenamiento` con todos los atributos a 0.

Cabe resaltar que la clase `Grupo` implementa la interfaz `EntidadInterface`, por lo que debe implementar los métodos que se definen en esta interfaz que comentamos previamente.

El constructor de la clase es el siguiente:

```typescript
  constructor(nombre: string, creador: number) {
    if (nombre === '') {
      throw new Error('Nombre de grupo vacío');
    }
    contador_id++;
    this.id = contador_id;
    this.nombre = nombre;
    this.creador = creador;
  }
```

Basicamente se comprueba que el nombre del grupo no esté vacío y se asignan los valores de los parámetros al resto de atributos de la clase.

La clase contiene tambien getters y setters para todos los atributos de la clase, además de ciertos métodos para modificar algunos elementos de los atributos de la clase. como son:

* `addParticipante` y `eraseParticipante`: Estos métodos permiten añadir y eliminar usuarios a la lista de participantes del grupo.

* `addRutaFavorita` y `eraseRutaFavorita`: Estos métodos permiten añadir y eliminar rutas a la lista de rutas favoritas del grupo.

* `addRutaRealizada`: Este método permite añadir una ruta al historico de rutas realizadas por el grupo, no se puede eliminar una ruta del historico porque no tiene sentido que un grupo elimine una ruta que ha realizado.

#### Retos

La clase `Reto` contiene la información de los retos que se pueden crear en el sistema. Un reto es basicamente un objetivo de entrenamiento que se puede realizar si se realizan una serie de rutas de las que conste el reto. 

Esta clase contiene los siguientes atributos:

```typescript
class Reto implements EntidadInterface {
    id: number;
    nombre: string;
    rutas: number[] = [];
    tipoActividad: Actividad;
    kmTotales: number = 0;
    usuarios: number[] = [];
...
```

Se puede apreciar que ciertos atributos se inicializan con un valor por defecto, esto se hace porque no se pasan por parámetro en el constructor, ya que estos atributos se van modificando a lo largo de la ejecución del sistema y cuando se va agregando información a los retos. 

Cabe resaltar que la clase `Reto` implementa la interfaz `EntidadInterface`, por lo que debe implementar los métodos que se definen en esta interfaz que comentamos previamente.

Podemos ver tambien que el atributo tipoActividad es de tipo `Actividad`, esto se debe a que el tipo de actividad de un reto es el mismo que el de las rutas que contiene el reto osea puede ser `Ciclismo` o `Running`.

El constructor de la clase es el siguiente:

```typescript
    constructor(nombre: string, tipoActividad: Actividad) {
      this.id = contador_id++;
      this.nombre = nombre;
      this.tipoActividad = tipoActividad;
    }
```

Los unicos parametros que se pasan al constructor son el nombre y el tipo de actividad, ya que los demás atributos se inicializan con un valor por defecto, además de que el atributo `id` se inicializa con el valor del contador de identificadores y se incrementa el contador de identificadores, como el las demas entidades, esto es para que al crear una entidad se le asigne un identificador único.

La clase contiene tambien getters y setters para todos los atributos de la clase, además de ciertos métodos para modificar algunos elementos de los atributos de la clase. como son:

* `addUsuario` y `removeUsuario`: Estos métodos permiten añadir y eliminar usuarios a la lista de usuarios que han realizado el reto.

* `addRuta` y `removeRuta`: Estos métodos permiten añadir y eliminar rutas a la lista de rutas que contiene el reto.

### Colecciones

Las colecciones son los contenedores de las entidades, en este caso las colecciones son los contenedores de las rutas, grupos, retos y usuarios. Se ha creado una carpeta dentro de `src` llamada `colecciones` en la que se encuentran los ficheros de las colecciones de cada entidad.

#### Colección de usuarios

La clase `ColeccionUsuario` contiene los métodos necesarios para gestionar los usuarios del sistema. Esta clase se ha definido con el siguiente atributo y este constructor:

```typescript
export class ColeccionUsuario implements Coleccion<Usuario> {
  private usuarios: Map<number, Usuario>;

  constructor() {
    this.usuarios = new Map();
  }
...
```

Como se puede apreciar el atributo de la clase es un `Map` que contiene los usuarios del sistema, el identificador de cada usuario es la clave del `Map` y el usuario en si es el valor del `Map`. En el constructor se inicializa el `Map` vacío. Además la clase implementa la interfaz `Coleccion` que se ha definido en el fichero `colecciones.ts` y que contiene los métodos que se deben implementar en las colecciones.

La clase es iterable pues se ha implementado el método `Symbol.iterator` de la siguiente forma:

```typescript
  [Symbol.iterator]() {
    return this.usuarios.values();
  }
```

Además se han implementados los setters y getters para el atributo `usuarios` de la clase, en este caso hay un setter cuyo parametro es un `Map` y otro setter cuyo `setUsuariosFromArray` que recibe un array de usuarios y lo convierte en un `Map` para asignarlo al atributo `usuarios`.

La clase contiene tambien los siguientes métodos para gestionar y modificar los usuarios:

* `listar`: Este método imprime por pantalla la lista de usuarios del sistema.
* `insertar: Este método inserta un usuario en el sistema. Se comprueba que el usuario no exista previamente en el sistema y si no existe se inserta en el sistema.
* `eliminar`: Este método elimina un usuario del sistema. Se comprueba que el usuario exista previamente en el sistema y si existe se elimina del sistema.
* `modificarNombre`: Este método modifica el nombre de un usuario del sistema. Se comprueba que no haya un usuario con el mismo nombre en el sistema y si no hay un usuario con el mismo nombre se modifica el nombre del usuario.
* `modificarContraseña`: Este método modifica la contraseña de un usuario del sistema. Se comprueba que la contraseña actual del usuario sea correcta y si es correcta se modifica la contraseña del usuario.
* `





### jsonCollection

A partir de la implementación de las colecciones heredan las clases denominadas `jsonCollection`, las cuales encontramos dentro de la carpeta `jsonModifiers` en `src`. Con estas cuatro clases (una por cada colección) podremos manejar los ficheros `.json` que se encuentran en la carptea `dataBase`, que es donde se almacenarán los datos de la aplicacción.

### jsonCollectionUsuario
Esta colección se encarga con todo lo relacionado con la persistencia de datos de los usuarios. Esta clase hereda de la clase `jsonCollection` y se ha definido de la siguiente forma:

```typescript
export class JsonColeccionGrupo extends ColeccionGrupo {
  private gruposDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>("./dataBase/grupos.json");
    this.gruposDatabase = lowdb(adapter);
    this.gruposDatabase.defaults({ grupos: [] }).write();
  }
```

Con sus distintos métodos

* ```public insertarGrupo(grupo: Grupo): void``` Esta se encarga de insertar un grupo en la base de datos.
* ``` public cargarGrupos(): Grupo[] ``` Esta se encarga de cargar los grupos de la base de datos. Se usa sobretodo a la hora de iniciar el programa  
* ``` public eliminarGrupo(grupo: Grupo): void ``` Esta se encarga de eliminar un grupo de la base de datos.
* ``` public modificarNombre(grupo: Grupo, nombre: string): void ``` Esta se encarga de modificar el nombre de un grupo de la base de datos.
* ``` public modificarCreador(grupo: Grupo, Creador: Usuario): void ``` Esta se encarga de modificar el creador de un grupo de la base de datos.
* ``` public addRutaRealizada( grupo: Grupo, ruta: { ruta number; fecha: string } ): void ``` Esta se encarga de añadir una ruta realizada a un grupo de la base de datos.
* ``` public addRutaFavorita(grupo: Grupo, ruta: number): void ``` Esta se encarga de añadir una ruta favorita a un grupo de la base de datos.
* ``` public eraseRutaFavorita(grupo: Grupo, ruta: number): void ``` Esta se encarga de eliminar una ruta favorita a un grupo de la base de datos.
* ``` public addParticipante(grupo: Grupo, participante: number): void ``` Esta se encarga de añadir un participante a un grupo de la base de datos.
* ``` public eraseParticipante(grupo: Grupo, participante: number): void ``` Esta se encarga de eliminar un participante a un grupo de la base de datos.


La primera de las cuatro clases es la relacionada con los usuarios. Lo primero que encontramos en el archivo es  la interfaz `DatabaseSchema`, que sirve para definir el tipo de dato que se va a guardar mediante el módulo `Lowdb`. Esta es muy simple como podemos observar a continuación:

```typescript
export interface DatabaseSchema {
  usuarios: Usuario[];
}
```







### jsonCollectionGrupos


## Conclusiones

En este proyecto se ha podido ver como se puede crear un sistema de gestión de rutas de ciclismo y running, además de poder crear grupos y retos para realizar rutas. Se ha podido ver como se puede crear un sistema de gestión de usuarios, rutas, grupos y retos, además de poder crear un sistema de login y registro de usuarios. Al haber hecho esta práctica en grupo hemos aprendido a usar GitHub para trabajar en equipo, además de aprender a usar las herramientas de desarrollo que se han usado en este proyecto (GitHub Actions, SonarCloud, Coveralls, etc.)

## Referencias
  [https://coveralls.io/](https://coveralls.io/)
  [https://sonarcloud.io/](https://sonarcloud.io/)
  [https://github.com/](https://github.com/)
  [https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/](https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/)
  [https://stackoverflow.com/](https://stackoverflow.com/)
  
 
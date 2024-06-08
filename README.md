# Sequence Angular Tech Test
## Conifguración Inicial
 - En primer lugar, se debe correr el comando `npm i` en la carpeta donde se localiza el package.json, para instalar las dependecias
 - El proyecto cuenta con un backend mockeado mediante JSON Server, se debe iniciar con `npx json-server mock.json`, ubicandose en http://localhost:3000/
 - Finalmente, se arranca el proyecto Angular mediante `ng serve`

## Documentación
### Resumen
La prueba consiste en la creación de una parte de una aplicación más grande, sobre la gestión de música. En concreto, la parte desarrollada corresponde a las funcionalidades relacionadas con las canciones.

### Backend (Mock)
Como se menciona previamente, el backend se ofrece mediante un archivo .json que hace las veces de BD. Mediante la librería `json-server`, se crea un backend mock con los endpoints mínimos para interactuar con dicha BD. 

Este número de endpoints ha limitado, en ocasiones, la inclusión de ciertas funcionalidades al proyecto, pues si bien se podrían realizar, acabarían incurriendo en sobre-ingeniería. Considero que es más adecuado
dejar dichas funcionalidades marcadas de cara a la inclusión de un backend totalmente funcional. 

Un ejemplo de esto es la actualización de las obras que tiene un artista. Al crear una nueva canción, se debería incluir su ID al array `songs`. Esto debería ser tarea del backend, pero como no cuenta con esa capacidad,
la opción para agregarlo desde el frontend sería
  1. Obtener el ID de la nueva canción (GET)
  2. Obtener el artista en cuestión, con una busqueda por su ID (GET)
  3. Modificar el artista, y devolverlo actualizado a la BD (PUT)
 
 Como se ha mencionado, es un claro caso de sobre-ingeniería, dandole funciones de backend al frontend

Para el cumplimiento del retador de 1sg (1000ms) requerido, se ha optado por la simulación de dicho retardo mediante código en el propio proyecto, dado que json-server ha eliminado el soporte para incluir retardo a las consultas.

### Gestión de la Carga
Relacionado a dicho retardo, se ha cumplimentado el requisito de gestión de la carga, incluyendo un spinner de Angular Material configurado para mostrarse mientras la aplicación obtiene los datos necesarios, proveyendo al usuario de una experiencia más satisfactoria

### Modelos
Para la interacción con el backend, se han creado 2 modelos, cada uno con los atributos propios de dicho objeto en BD
  - Song
  - Artist

### Componentes y Vistas
La gestión de los componentes se ha realizado dividiendolos entre aquellos reutilizables, ubicados en la carpeta *components*, siguiendo la nomenclatura *c-NOMBRE*. Para este caso, se cuenta con un componente de esta índole, denominado _c-song-card_, una carta donde se muestra información de la canción, inspirada directamente del diseño preliminar proporcionado

Por otro lado, los componentes que hacen las veces de vistas, ubicados en la carpeta *views*, siguiendo la nomenclatura *v-NOMBRE*. Para este caso, existen 3 vistas, cada una relacionada con las funcionalidades
implementadas
 - v-home: Vista inicial donde se muestra el listado de canciones
 - v-song-details: Vista con información mas detallada de la canción, accesible al seleccionar alguna de las cartas
 - v-song-crud: Vista CRUD para la creación de una nueva obra, o edición de una ya existente, mediante el uso de un formulario

#### Formulario
El formulario está principalmente construido mediante el uso de componentes de la librería Angular Material, de rápida configuración y convenientemente mantenida por Google. Además dichos campos cuentan con validaciones por defecto, aunque se han incluido otras como campos requeridos ó número máximo de dígitos en el año

En concreto, se ha optado por recurrir a inputs de texto básico, calendario (datepicker), selector (dropdown) y tags

#### Services
La interacción con el backend se ha realizado mediante la creación de un servicio por cada una de las vistas, con los endpoints necesarios para nutrir al frontend de los datos.

Cada endpoint recurre a un archivo de constantes para conocer la ruta en cuestión, facilitando el mantenimiento del proyecto y la escalabilidad y, de la misma manera, al host en el que se encuentre el backend, dejándolo preparado para despegarlo en un futuro
 
#### Lazy Loading
Se ha configurado el routing de las vistas para funcionar mediante Lazy Loading, permitiendo así una mayor velocidad de respuesta y una escalabilidad mas aproximada a la realidad según el proyecto crezca

### i18n
Cumpliendo el requisito especificado, el proyecto se encuentra configurado para la internacionalización mediante la librería `ngx-translate`

Una vez añadidos los modulos correspondientes, se crea un archivo .json por cada uno de los idiomas disponibles (para este caso, solo se ha requerido el español), donde se alojan los literales a mostrar. En cada una de las vistas, se recurre a dichos literales mediante la estructura `{{LANGUAGE.LITERAL | translate}}`

### CSS
Para el estilado, se ha recurrido a SCSS (Sass: Syntactically Awesome Style Sheets), por las capacidades extra que aporta frente a CSS convencional, con el anidamiento de las clases.

Para facilitar dicho anidamiento, se usa una nomenclatura padre-hijo para las clases, por ejemplo
 - div padre -> class="card"
 - div hijo -> class="card__content"

El diseño en escritorio se muestra apegado a la vista móvil, siendo esta responsiva en múltiples dispositivos

### Testing
Para el testing, se ha utilizado la herramienta Karma Jasmine, opción por defecto de Agular, desarrollando tests para las nuevas vistas, componentes y servicios de interacción con el backend

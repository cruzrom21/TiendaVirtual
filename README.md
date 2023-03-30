# TiendaVirtual
Tienda virual con ReactJs y .NET6

# Arquitectura

1. Para el Frontend se creó un proyecto ReactJS con Redux para manejo de estados.
2. Para el Backend se creó un proyecto Api Rest .Net6 Core con patrón de diseño MVC y con arquitectura de capas User Interface, Busines Logic y Data Access.

# Como ejecutar

1.	Clonar el repositorio https://github.com/cruzrom21/TiendaVirtual.git.
2.	Ejecutar en base de datos SqlSever el script “DbTiendaVirtual.sql” adjunto.
3.	Abrir el proyecto Backend en Visual Studio 2022, debe tener .Net6 SDK instalado.
4.	En el archivo appsettings.json, editar ConnectionStrings con la ruta del servidor donde se ejecutó el script “DbTiendaVirtual.sql”.
5.	Ejecutar proyecto “TiendaVirtual” en el Visual Studio 2022.
6.	Abrir por consola la carpeta del proyecto Frontend y ejecutar el comando npm install, una vez finalice ejecutar npm start.
Con esto finaliza la instalación y la aplicación esta lista para las pruebas. En caso de error, revisar la conexión a base de datos.



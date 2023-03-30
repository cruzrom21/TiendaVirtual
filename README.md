# TiendaVirtual
Tienda virual con ReactJs y .NET6

# Arquitectura

•	Para el Frontend se creó un proyecto ReactJS con Redux para manejo de estados.
•	Para el Backend se creó un proyecto Api Rest .Net6 Core con patrón de diseño MVC y con arquitectura de capas User Interface, Busines Logic y Data Access.

# Como ejecutar

1.	Clonar el repositorio https://github.com/cruzrom21/TiendaVirtual.git.
2.	Ejecutar en base de datos SqlSever el script “DbTiendaVirtual.sql” adjunto.
3.	Abrir el proyecto Backend en Visual Studio 2022, debe tener .Net6 SDK instalado.
4.	En el archivo appsettings.json, editar ConnectionStrings con la ruta del servidor donde se ejecutó el script “DbTiendaVirtual.sql”.
5.	Ejecutar proyecto “TiendaVirtual” en el Visual Studio 2022.
6.	Abrir por consola la carpeta del proyecto Frontend y ejecutar el comando npm install, una vez finalice ejecutar npm start.
Con esto finaliza la instalación y la aplicación esta lista para las pruebas. En caso de error, revisar la conexión a base de datos.

# Bloqueos
Al realizar el proceso de desarrollo Frontend me encontré con algunos bloqueos en el manejo de los estados, en la pantalla de creación carrito y filtrar la lista de productos disponibles; los cuales se solventaron consultando información desde Stack Overflow y fuentes similares o fue necesario cambiar el enfoque previsto que se tenía para las pantallas mencionadas ya que esto podría llegar extender el tiempo de realización de prueba.

# Si tuviera más tiempo 
Si hubiese tenido más tiempo realizaría un barrido para hacer Clean Code con el cual se podría mejorar la presentación del código, eliminado código repetido y variables quemadas que puedan llegar afectar el rendimiento de la aplicación, por otro lado, haría mas pruebas para identificar errores no previstos, implementaría mejoras en el filtrado de productos y la pantalla de carrito, puesto que se encontraron inconvenientes que no permitieron su ejecución como estaba planeado.

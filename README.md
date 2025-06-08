# Flav-IA

Asistente web hecha en Angular que asiste en la
inscripción a comisiones. Permite cargar un archivo CSV con peticiones,
previsualizarlo y consultar al backend para obtener sugerencias de inscripción.

## Organización del proyecto

- **`src/domain`**: modelos de dominio utilizados por la aplicación.
- **`src/application`**: servicios y puertos HTTP. Incluye adaptadores para el
  backend real y _fakes_ para el modo de pruebas.
- **`src/presentation`**: componentes y vistas de la interfaz.
- **`src/environments`**: archivos de configuración de entornos.
- **`tests`**: pruebas unitarias con Jest.

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

La aplicación quedará disponible en `http://localhost:4200/`.

Para iniciar el proyecto utilizando los servicios _fake_ se puede ejecutar:

```bash
npm run start:mock
```

## Configuración de entornos

El archivo `src/environments/environment.ts` contiene la configuración por
defecto. Para producción se utiliza `environment.prod.ts` y existe
`environment.mock.ts` para habilitar `useMockHttp`, lo que permite trabajar sin
un backend real. La propiedad `apiBaseUrl` define la URL base de la API.

## Ejecutar pruebas

```bash
npm test
```

Ejecuta Jest y todas las especificaciones ubicadas en el directorio `tests`.

## Linting y formateo

- `npm run lint` analiza el código con ESLint.
- `npm run format` aplica Prettier a los archivos del proyecto.

## Compilación

Para generar la versión de distribución:

```bash
npm run build
```

## Uso de los mocks

Cuando `useMockHttp` es `true`, los puertos HTTP de la capa de aplicación
utilizan `AsistenteHttpClientFake` y `CsvHttpClientFake`. Esto permite ejecutar
la interfaz sin necesidad de un backend disponible.

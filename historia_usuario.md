# Historias de Usuario - Gestor de Tareas

## HU-001: Sistema de Login Básico
**Responsable:** Integrante 1

**Como** usuario  
**Quiero** poder identificarme en la aplicación  
**Para** tener mis tareas guardadas de forma personal

### Criterios de Aceptación:
- ✅ Formulario de login con usuario y contraseña
- ✅ Validación de campos vacíos
- ✅ Mostrar nombre de usuario en el header
- ✅ Botón de cerrar sesión

### Tareas Técnicas:
- Crear HTML para formulario de login
- Agregar estilos al formulario
- Implementar validación en JavaScript
- Guardar sesión en localStorage

---

## HU-002: Persistencia de Datos con LocalStorage
**Responsable:** Integrante 2

**Como** usuario  
**Quiero** que mis tareas se guarden automáticamente  
**Para** no perder la información al cerrar el navegador

### Criterios de Aceptación:
- ✅ Guardar tareas en localStorage al agregar/modificar
- ✅ Cargar tareas al iniciar la aplicación
- ✅ Mantener el contador de IDs
- ✅ Funcionar sin conexión a internet

### Tareas Técnicas:
- Implementar función saveToLocalStorage()
- Implementar función loadFromLocalStorage()
- Llamar a guardar en cada operación CRUD
- Cargar datos al iniciar

---

## HU-003: Filtros y Categorías de Tareas
**Responsable:** Integrante 3

**Como** usuario  
**Quiero** filtrar mis tareas por estado (todas/pendientes/completadas)  
**Para** visualizar mejor mi progreso

### Criterios de Aceptación:
- ✅ Botones de filtro: Todas, Pendientes, Completadas
- ✅ Cambiar vista según filtro seleccionado
- ✅ Indicador visual del filtro activo
- ✅ Actualizar contador según filtro

### Tareas Técnicas:
- Agregar botones de filtro en HTML
- Estilos para botones activos/inactivos
- Función filterTasks() en JavaScript
- Integrar con renderTasks()

---

## HU-004: Edición de Tareas
**Responsable:** Integrante 1

**Como** usuario  
**Quiero** poder editar el texto de una tarea existente  
**Para** corregir errores o actualizar información

### Criterios de Aceptación:
- ✅ Botón de editar en cada tarea
- ✅ Campo de texto para modificar
- ✅ Guardar y cancelar edición
- ✅ Actualizar la tarea en el array

### Tareas Técnicas:
- Agregar botón "Editar" a cada tarea
- Crear modo de edición inline
- Función editTask() y saveEdit()
- Actualizar estilos para modo edición

---

## HU-005: Diseño Responsivo y Mejoras Visuales
**Responsable:** Integrante 2

**Como** usuario  
**Quiero** usar la aplicación en mi móvil  
**Para** gestionar tareas desde cualquier dispositivo

### Criterios de Aceptación:
- ✅ Diseño adaptable a móviles (< 768px)
- ✅ Botones táctiles de buen tamaño
- ✅ Animaciones suaves
- ✅ Modo oscuro (opcional)

### Tareas Técnicas:
- Media queries para responsive
- Ajustar tamaños de fuente y botones
- Agregar transiciones CSS
- Implementar tema oscuro con toggle

---

## 📝 Notas de Implementación

### Orden Recomendado:
1. HU-002 (Persistencia) - Base para las demás
2. HU-001 (Login) - Personalización
3. HU-004 (Edición) - Funcionalidad importante
4. HU-003 (Filtros) - Mejora de UX
5. HU-005 (Responsive) - Pulido final

### Branches Sugeridas:
- `feature/HU-001-login`
- `feature/HU-002-localstorage`
- `feature/HU-003-filtros`
- `feature/HU-004-edicion`
- `feature/HU-005-responsive`

### Convenciones de Commits:
- `feat(HU-XXX):` - Nueva funcionalidad
- `fix(HU-XXX):` - Corrección de bug
- `style(HU-XXX):` - Cambios de estilo
- `docs:` - Documentación
- `refactor:` - Refactorización de código
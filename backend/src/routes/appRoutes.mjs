import { Router } from 'express';
import {
    createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment
} from '../controllers/assignmentController.mjs';
import {
    createBudget, deleteBudget, getAllBudgets, getBudgetById, updateBudget
} from '../controllers/budgetController.mjs';
import { createCollaborator, deleteCollaborator, getAllCollaborators, getCollaboratorById, updateCollaborator } from '../controllers/collaboratorController.mjs';
import {
    createComment, deleteComment, getAllComments, getCommentById, updateComment
} from '../controllers/commentController.mjs';
import {
    createDocument, deleteDocument, getAllDocuments, getDocumentById, updateDocument
} from '../controllers/documentController.mjs';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectController.mjs';
import {
    createRisk, deleteRisk, getAllRisks, getRiskById, updateRisk
} from '../controllers/riskController.mjs';
import {
    createTask, deleteTask, getAllTasks, getTaskById, updateTask
} from '../controllers/taskController.mjs';
import { createTaskType, deleteTaskType, getAllTaskTypes, getTaskTypeById, updateTaskType } from '../controllers/taskTypeController.mjs';
import {
    createUser, deleteUser, getAllUsers, getUserById, updateUser
} from '../controllers/userController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';


const router = Router();
// Rutas para asignaciones
router.post('/assignments', authenticateToken, createAssignment);
router.get('/assignments', authenticateToken, getAllAssignments);
router.get('/assignments/:id', authenticateToken, getAssignmentById);
router.put('/assignments', authenticateToken, updateAssignment);
router.delete('/assignments/:id', authenticateToken, deleteAssignment);

// Rutas para presupuestos
router.post('/budgets', authenticateToken, createBudget);
router.get('/budgets', authenticateToken, getAllBudgets);
router.get('/budgets/:id', authenticateToken, getBudgetById);
router.put('/budgets', authenticateToken, updateBudget);
router.delete('/budgets/:id', authenticateToken, deleteBudget);

// Rutas para colaboradores
router.post('/collaborators', authenticateToken, createCollaborator);
router.get('/collaborators', authenticateToken, getAllCollaborators);
router.get('/collaborators/:id', authenticateToken, getCollaboratorById);
router.put('/collaborators', authenticateToken, updateCollaborator);
router.delete('/collaborators/:id', authenticateToken, deleteCollaborator);

// Rutas para comentarios
router.post('/comments', authenticateToken, createComment);
router.get('/comments', authenticateToken, getAllComments);
router.get('/comments/:id', authenticateToken, getCommentById);
router.put('/comments', authenticateToken, updateComment);
router.delete('/comments/:id', authenticateToken, deleteComment);

// Rutas para documentos
router.post('/documents', authenticateToken, createDocument);
router.get('/documents', authenticateToken, getAllDocuments);
router.get('/documents/:id', authenticateToken, getDocumentById);
router.put('/documents', authenticateToken, updateDocument);
router.delete('/documents/:id', authenticateToken, deleteDocument);

// Rutas para proyectos
router.post('/projects', authenticateToken, createProject);
router.get('/projects', authenticateToken, getAllProjects);
router.get('/projects/:id', authenticateToken, getProjectById);
router.put('/projects', authenticateToken, updateProject);
router.delete('/projects/:id', authenticateToken, deleteProject);

// Rutas para riesgos
router.post('/risks', authenticateToken, createRisk);
router.get('/risks', authenticateToken, getAllRisks);
router.get('/risks/:id', authenticateToken, getRiskById);
router.put('/risks', authenticateToken, updateRisk);
router.delete('/risks/:id', authenticateToken, deleteRisk);

// Rutas para tareas
router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getAllTasks);
router.get('/tasks/:id', authenticateToken, getTaskById);
router.put('/tasks', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

// Rutas para tipos de tarea
router.post('/task-types', authenticateToken, createTaskType);
router.get('/task-types', authenticateToken, getAllTaskTypes);
router.get('/task-types/:id', authenticateToken, getTaskTypeById);
router.put('/task-types', authenticateToken, updateTaskType);
router.delete('/task-types/:id', authenticateToken, deleteTaskType);

// Rutas para usuarios
router.post('/users', authenticateToken, createUser);
router.get('/users', authenticateToken, getAllUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.put('/users', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;

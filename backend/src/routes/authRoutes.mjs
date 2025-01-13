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
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from '../controllers/customerController.mjs';
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

import { profile } from '../controllers/authController.mjs';

const router = Router();
// Rutas para autenticación
router.get('/auth/profile', authenticateToken, profile);

// Rutas para asignaciones
router.post('/assignments', authenticateToken, createAssignment);
router.get('/assignments', authenticateToken, getAllAssignments);
router.put('/assignments/:id', authenticateToken, updateAssignment);
router.get('/assignments/:id', authenticateToken, getAssignmentById);
router.delete('/assignments/:id', authenticateToken, deleteAssignment);

// Rutas para presupuestos
router.post('/budgets', authenticateToken, createBudget);
router.get('/budgets', authenticateToken, getAllBudgets);
router.put('/budgets/:id', authenticateToken, updateBudget);
router.get('/budgets/:id', authenticateToken, getBudgetById);
router.delete('/budgets/:id', authenticateToken, deleteBudget);

// Rutas para colaboradores
router.post('/collaborators', authenticateToken, createCollaborator);
router.get('/collaborators', authenticateToken, getAllCollaborators);
router.put('/collaborators/:id', authenticateToken, updateCollaborator);
router.get('/collaborators/:id', authenticateToken, getCollaboratorById);
router.delete('/collaborators/:id', authenticateToken, deleteCollaborator);

// Rutas para comentarios
router.post('/comments', authenticateToken, createComment);
router.get('/comments', authenticateToken, getAllComments);
router.put('/comments/:id', authenticateToken, updateComment);
router.get('/comments/:id', authenticateToken, getCommentById);
router.delete('/comments/:id', authenticateToken, deleteComment);

// Rutas para documentos
router.post('/documents', authenticateToken, createDocument);
router.get('/documents', authenticateToken, getAllDocuments);
router.put('/documents/:id', authenticateToken, updateDocument);
router.get('/documents/:id', authenticateToken, getDocumentById);
router.delete('/documents/:id', authenticateToken, deleteDocument);

// Rutas para proyectos
router.post('/projects', authenticateToken, createProject);
router.get('/projects', authenticateToken, getAllProjects);
router.put('/projects/:id', authenticateToken, updateProject);
router.get('/projects/:id', authenticateToken, getProjectById);
router.delete('/projects/:id', authenticateToken, deleteProject);

// Rutas para riesgos
router.post('/risks', authenticateToken, createRisk);
router.get('/risks', authenticateToken, getAllRisks);
router.put('/risks/:id', authenticateToken, updateRisk);
router.get('/risks/:id', authenticateToken, getRiskById);
router.delete('/risks/:id', authenticateToken, deleteRisk);

// Rutas para tareas
router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getAllTasks);
router.put('/tasks/:id', authenticateToken, updateTask);
router.get('/tasks/:id', authenticateToken, getTaskById);
router.delete('/tasks/:id', authenticateToken, deleteTask);

// Rutas para tipos de tarea
router.post('/task-types', authenticateToken, createTaskType);
router.get('/task-types', authenticateToken, getAllTaskTypes);
router.put('/task-types/:id', authenticateToken, updateTaskType);
router.get('/task-types/:id', authenticateToken, getTaskTypeById);
router.delete('/task-types/:id', authenticateToken, deleteTaskType);

// Rutas para usuarios
router.post('/users', authenticateToken, createUser);
router.get('/users', authenticateToken, getAllUsers);
router.put('/users/:id', authenticateToken, updateUser);
router.get('/users/:id', authenticateToken, getUserById);
router.delete('/users/:id', authenticateToken, deleteUser);

// Rutas para clientes
router.post('/customers', authenticateToken, createCustomer);
router.get('/customers', authenticateToken, getAllCustomers);
router.put('/customers/:id', authenticateToken, updateCustomer);
router.get('/customers/:id', authenticateToken, getCustomerById);
router.delete('/customers/:id', authenticateToken, deleteCustomer);

export default router;

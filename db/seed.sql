--- seeding data for assignment management web application

-- insert statuses
INSERT INTO status (name) VALUES
('Archived'),
('Not Started'),
('In Progress'),
('Completed'),
('Overdue');

-- insert categories
INSERT INTO categories (name, description) VALUES
('Capstone', 'Working on Capstone Project'),
('SENG 513', 'Working on SENG 513 Project'),
('Midterm', 'Studying for Midterm'),
('ENGG 519', 'Working on ENGG 519 Project');

-- insert sample users
INSERT INTO users (username, email, password_hash, google_id, role, notify_deadlines, notify_daily_summary, notify_overdue, created_at, updated_at) VALUES
('fisayo', 'fisayo@procrastapp.com', '$2b$10$WV8l.USo9YikBLVPyqHPZeNlGWtASiVMKAU1LHp6m0z9EYNzrFhoG', NULL, 'admin', true, false, true, NOW(), NOW()),
('maheen', 'maheen@procrastapp.com', '$2b$10$WV8l.USo9YikBLVPyqHPZeNlGWtASiVMKAU1LHp6m0z9EYNzrFhoG', NULL, 'student', true, false, true, NOW(), NOW()),
('youssef', 'youssef@procrastapp.com', '$2b$10$WV8l.USo9YikBLVPyqHPZeNlGWtASiVMKAU1LHp6m0z9EYNzrFhoG', NULL, 'student', true, false, true, NOW(), NOW()),
('caleb', 'caleb@procrastapp.com', '$2b$10$WV8l.USo9YikBLVPyqHPZeNlGWtASiVMKAU1LHp6m0z9EYNzrFhoG', NULL, 'student', true, false, true, NOW(), NOW()),
('syril', 'syril@procrastapp.com', '$2b$10$WV8l.USo9YikBLVPyqHPZeNlGWtASiVMKAU1LHp6m0z9EYNzrFhoG', NULL, 'student', true, false, true, NOW(), NOW());

-- insert sample tasks
INSERT INTO tasks (user_id, category_id, status_id, title, description, due_date, has_document, status) VALUES
(1, 1, 1, 'Finish Project Proposal', 'Complete the project proposal document', '2025-12-10 23:59:59', true, 'not-started'),
(1, 2, 2, 'Buy Groceries', 'Milk, Eggs, Bread', '2025-12-05 18:00:00', false, 'in-progress'),
(2, 3, 1, 'Study Algorithms', 'Practice dynamic programming problems', '2025-12-08 20:00:00', true, 'completed'),
(2, 2, 3, 'Clean Room', 'Organize desk and wardrobe', '2025-12-06 19:00:00', false, 'archived'),
(3, 1, 2, 'Team Meeting Prep', 'Prepare slides for Monday meeting', '2025-12-07 10:00:00', true, 'not-started'),
(3, 3, 1, 'Read Research Paper', 'Read paper on neural networks', '2025-12-09 15:00:00', false, 'in-progress'),
(4, 2, 1, 'Workout', 'Gym session for 1 hour', '2025-12-05 07:00:00', true, 'completed'),
(4, 3, 2, 'Math Assignment', 'Complete calculus assignment', '2025-12-08 23:59:59', false, 'archived'),
(5, 1, 3, 'Client Email', 'Respond to client inquiries', '2025-12-06 17:00:00', true, 'not-started'),
(5, 2, 1, 'Grocery Shopping', 'Buy vegetables and fruits', '2025-12-05 18:00:00', true, 'not-started');

-- insert reminders
INSERT INTO reminders (task_id, remind_at) VALUES
(1, '2025-10-14 09:00:00'),
(2, '2025-10-19 10:00:00'),
(3, '2025-10-17 08:00:00'),
(4, '2025-10-21 15:00:00'),
(5, '2025-10-24 12:00:00');

-- insert documents
INSERT INTO documents (user_id, title, content, total_time_spent, due_date, document) VALUES
(1, 'Capstone Proposal Draft', 'Initial draft text...', 1200, '2025-11-15 23:59:00'),
(2, 'Auth Module Notes', 'Notes for auth module...', 400, '2025-11-20 23:59:00'),
(3, 'Midterm Study Summary', 'Study notes...', 900, '2025-11-18 12:00:00'),
(4, 'ENGG 519 Writeup', 'Project writeup...', 600, '2025-11-22 23:59:00'),
(5, 'Project Timeline Planning', 'Plan details...', 300, '2025-11-25 18:00:00');

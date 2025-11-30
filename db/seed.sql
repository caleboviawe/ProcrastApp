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
INSERT INTO users (username, email, password_hash) VALUES
('maheen', 'maheen@procrastapp.com', 'hashed_password_1'),
('fisayo', 'fisayo@procrastapp.com', 'hashed_password_2'),
('youssef', 'youssef@procrastapp.com', 'hashed_password_3'),
('caleb', 'caleb@procrastapp.com', 'hashed_password_4'),
('syril', 'syril@procrastapp.com', 'hashed_password_5');

-- insert sample tasks
INSERT INTO tasks (user_id, category_id, status_id, title, description, due_date) VALUES
(1, 1, 2, 'Complete project proposal', 'Draft and submit the project proposal for Capstone.', '2025-11-15 23:59:00'),
(2, 2, 3, 'Implement authentication module', 'Develop the user authentication module for the application.', '2025-11-20 23:59:00'),
(3, 3, 1, 'Study for midterm exam', 'Review all materials and practice past papers for the midterm.', '2025-11-18 12:00:00'),
(4, 4, 4, 'Finish ENGG 519 assignment', 'Complete and submit the assignment for ENGG 519.', '2025-11-22 23:59:00'),
(5, NULL, 2, 'Plan project timeline', 'Create a detailed timeline for project milestones and deadlines.', '2025-11-25 18:00:00');

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

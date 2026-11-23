-- CreateTable
CREATE TABLE `doors` (
    `id` VARCHAR(64) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `model_code` VARCHAR(100) NULL,
    `category` VARCHAR(150) NULL DEFAULT 'General Doors',
    `dimensions` VARCHAR(150) NULL DEFAULT '2100 × 900 × 50mm',
    `material` TEXT NULL,
    `finish` TEXT NULL,
    `hardware_specs` TEXT NULL,
    `fire_rating` VARCHAR(100) NULL DEFAULT 'Standard / FD30',
    `acoustic_rating` VARCHAR(100) NULL DEFAULT '35 dB',
    `unit_price` DECIMAL(12, 2) NOT NULL DEFAULT 2500.00,
    `formatted_price` VARCHAR(100) NULL DEFAULT '₵2,500.00',
    `stock_quantity` INTEGER NOT NULL DEFAULT 5,
    `lead_time_days` INTEGER NOT NULL DEFAULT 3,
    `status` VARCHAR(50) NOT NULL DEFAULT 'in_stock',
    `supplier_or_workshop` VARCHAR(255) NULL DEFAULT 'Door Master Official (doormaster.online)',
    `image_url` TEXT NULL,
    `source_url` TEXT NULL,
    `scraped_at` VARCHAR(64) NULL,
    `description` TEXT NULL,
    `warranty_years` INTEGER NOT NULL DEFAULT 10,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_category`(`category`),
    INDEX `idx_status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `item_count` INTEGER NOT NULL DEFAULT 0,
    `icon` VARCHAR(60) NULL DEFAULT 'meeting_room',
    `description` TEXT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(64) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(50) NULL DEFAULT '+233 24 555 0100',
    `avatar_url` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `idx_email`(`email`),
    INDEX `idx_role`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `installation_jobs` (
    `id` VARCHAR(64) NOT NULL,
    `job_number` VARCHAR(50) NOT NULL,
    `client_name` VARCHAR(255) NOT NULL,
    `client_phone` VARCHAR(50) NOT NULL,
    `client_email` VARCHAR(255) NULL DEFAULT '',
    `address` TEXT NOT NULL,
    `lat` DECIMAL(10, 7) NOT NULL DEFAULT 5.6037,
    `lng` DECIMAL(10, 7) NOT NULL DEFAULT -0.1870,
    `door_id` VARCHAR(64) NULL,
    `door_name` VARCHAR(255) NOT NULL,
    `door_model_code` VARCHAR(100) NULL DEFAULT '',
    `door_dimensions` VARCHAR(150) NULL DEFAULT '2100 × 900 × 50mm',
    `lock_model` VARCHAR(150) NULL DEFAULT 'DoorMaster Bio-Metric Smart Lock',
    `deposit_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `balance_due` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `status` VARCHAR(50) NOT NULL DEFAULT 'scheduled',
    `assigned_driver_id` VARCHAR(64) NULL,
    `driver_assignment_status` VARCHAR(50) NULL DEFAULT 'pending',
    `assigned_installer_id` VARCHAR(64) NULL,
    `installer_assignment_status` VARCHAR(50) NULL DEFAULT 'pending',
    `operations_approved` BOOLEAN NOT NULL DEFAULT false,
    `scheduled_time` VARCHAR(100) NULL DEFAULT 'Today, 2:00 PM',
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `installation_jobs_job_number_key`(`job_number`),
    INDEX `idx_job_status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sms_logs` (
    `id` VARCHAR(64) NOT NULL,
    `recipient_phone` VARCHAR(50) NOT NULL,
    `recipient_role` VARCHAR(50) NOT NULL,
    `recipient_name` VARCHAR(255) NOT NULL,
    `sender_id` VARCHAR(50) NOT NULL DEFAULT 'DoorMaster',
    `message_text` TEXT NOT NULL,
    `trigger_event` VARCHAR(100) NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'delivered',
    `provider_ref` VARCHAR(100) NULL DEFAULT 'SIM-DIRECT',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


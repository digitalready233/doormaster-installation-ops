-- AlterTable
ALTER TABLE `installation_jobs`
  ADD COLUMN `assigned_installer_ids` JSON NULL,
  ADD COLUMN `assigned_installer_names` JSON NULL,
  ADD COLUMN `assigned_installers` JSON NULL;

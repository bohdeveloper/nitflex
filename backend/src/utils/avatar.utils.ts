import fs from "fs";
import path from "path";

/**
 * Elimina un avatar del sistema de archivos si existe.
 * @param avatarPath Ruta del avatar guardada en BD (/uploads/avatars/xxx.png)
 */
export const deleteAvatarIfExists = (avatarPath?: string): void => {
  if (!avatarPath) return;

  const fullPath = path.join(
    process.cwd(), // raíz del proyecto (seguro en dev y prod)
    avatarPath
  );

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

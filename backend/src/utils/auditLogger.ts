import AuditLog from "../models/auditLog.model";

export const logAuditEvent = async (action: string, description: string, userId?: number) => {
  try {
    const newLog=await AuditLog.create({
      action,
      description,
      userId,
    });

    console.log("audit event logged successfully:",newLog)
  } catch (error) {
    console.error("Failed to log audit event:", error);
  }
};

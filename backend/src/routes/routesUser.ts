import { Request, Response, Router } from "express";

// class
import { UserController } from "../controllers/userControllers";

const routesUser = Router();

routesUser.post("/cadastro", async (req: Request, res: Response) => {
    const controller = new UserController();
    try {
        const dataUser = await controller.getDataToValidation(req);
        if (typeof dataUser === "object") {
            const callService = await controller.submitDataToService(dataUser);
            switch (callService) {
                case "existing user":
                    res.status(400).json({message: callService});
                    break
                case "registered successfully":
                    res.status(201).json({message: callService});
                    break
            };
        } else {
            res.status(400).json({message: dataUser});
            return;
        };
    } catch {
        res.status(500).json({error: "system error"});
        return;
    };
});

export default routesUser;
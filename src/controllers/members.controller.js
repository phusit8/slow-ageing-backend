import { methods as membersService } from "#services/members.service.js";

export const methods = {
    async getProfile(req, res) {
        try {
            const { lineId } = req.params;
            const result = await membersService.getProfile(lineId);
            return res.status(result.code).json(result.data);
        } catch (error) {
            console.error("MembersController getProfile error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async handleSetup(req, res) {
        try {
            const {
                userId,
                line_id,
                profileName,
                full_name,
                profileVillage,
                community,
                pictureUrl,
                profile_image,
                birth_date,
                gender,
                height,
                weight,
                chronic_diseases,
                drug_allergies,
                isAcceptedTerms,
                consented,
            } = req.body;

            const finalLineId = userId || line_id;
            const finalFullName = profileName || full_name;
            const finalCommunity = profileVillage || community;
            const finalImage = pictureUrl || profile_image;
            const finalConsented = isAcceptedTerms !== undefined ? Boolean(isAcceptedTerms) : (consented !== undefined ? Boolean(consented) : true);

            let normalizedGender = null;
            if (gender) {
                const g = String(gender).trim().toLowerCase();
                if (g === 'ชาย' || g === 'male') normalizedGender = 'male';
                else if (g === 'หญิง' || g === 'female') normalizedGender = 'female';
            }

            const payload = {
                line_id: finalLineId || "",
                full_name: finalFullName,
                community: finalCommunity,
                profile_image: finalImage,
                birth_date: birth_date || null,
                gender: normalizedGender,
                height: height || null,
                weight: weight || null,
                chronic_diseases: chronic_diseases || null,
                drug_allergies: drug_allergies || null,
                consented: finalConsented,
                consented_at: finalConsented ? new Date() : null,
            };

            const result = await membersService.saveSetup(payload);
            return res.status(result.code).json({
                message: "Setup saved successfully",
                data: result.data,
            });
        } catch (error) {
            console.error("MembersController handleSetup error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

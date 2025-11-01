
INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '17a39f85-05f3-4f1a-93ed-ac5f0977c13e', 40, 172.00, 73.90, 24,
    0, 0, 5, 8, 7, 3, 5
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '61d60aa0-aff8-4b65-a3c9-f18e7b4f19c8', NULL, '17a39f85-05f3-4f1a-93ed-ac5f0977c13e', 'Acceptance'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '415943af-a50d-431b-9339-3f56fe1ca3bb', 32, 172.00, 73.90, 25,
    0, 0, 4, 7, 6, 4, 5
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '8985fa37-9c87-4c06-a541-0f5046da502b', NULL, '415943af-a50d-431b-9339-3f56fe1ca3bb', 'Acceptance'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '83b5533b-1ec2-4116-a45e-18e22eef9d3c', 47, 172.00, 73.90, 23,
    0, 0, 6, 6, 5, 3, 7
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '39f2b708-5ef4-483b-a194-ff4a3ddd1ebf', NULL, '83b5533b-1ec2-4116-a45e-18e22eef9d3c', 'Acceptance'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    'a8b55110-e653-47c6-9d08-c7f6aaba4ef7', 29, 172.00, 73.90, 26,
    1, 0, 5, 6, 6, 6, 2
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    'a50a785b-8a9a-494a-991a-98f7a5f69f7d', NULL, 'a8b55110-e653-47c6-9d08-c7f6aaba4ef7', 'Risk surcharge indicated'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    'b99363f9-9e90-4527-b408-be508b857a64', 34, 172.00, 73.90, 23,
    0, 0, 8, 7, 9, 1, 8
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    'a239ac27-3acf-4005-88fe-f87a94daa1f2', NULL, 'b99363f9-9e90-4527-b408-be508b857a64', 'Additional clarification indicated'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '4a926910-6eab-46af-a0ae-21913cd9ff10', 35, 172.00, 73.90, 36,
    1, 0, 3, 4, 7, 7, 2
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '472988b0-e466-4678-9b0d-5fc80deafe41', NULL, '4a926910-6eab-46af-a0ae-21913cd9ff10', 'Rejection'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '24883762-f9cc-4f89-916c-fde0d4b936d2', 40, 172.00, 73.90, 24,
    0, 0, 6, 5, 5, 5, 3
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '33b8a8f9-0c38-42be-a109-2ca8e534c651', NULL, '24883762-f9cc-4f89-916c-fde0d4b936d2', 'Additional clarification indicated'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '0541e37c-dfbe-49dc-b96c-f3090a0dbe4d', 32, 172.00, 73.90, 27,
    1, 0, 4, 6, 6, 2, 2
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '9b0be556-88e8-45b7-b6ff-0be3b0c3d0b0', NULL, '0541e37c-dfbe-49dc-b96c-f3090a0dbe4d', 'Risk surcharge indicated'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    'cacf87e9-a49e-4fb6-a1c5-4dee5d43f126', 47, 172.00, 73.90, 22,
    0, 0, 8, 7, 8, 1, 3
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    'f8484b79-dc86-4d65-82e2-066c60ffdac3', NULL, 'cacf87e9-a49e-4fb6-a1c5-4dee5d43f126', 'Acceptance'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '720e17ee-3142-4c98-9306-12726731afc8', 29, 172.00, 73.90, 12,
    1, 0, 3, 8, 8, 5, 0
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '759af656-1d5d-44cc-b600-8fa1a1906ed9', NULL, '720e17ee-3142-4c98-9306-12726731afc8', 'Rejection'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '1c327252-1329-448d-96c3-e4cf562a2632', 34, 172.00, 73.90, 24,
    0, 1, 5, 7, 4, 3, 2
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    'f09bec2f-84a0-46ac-8862-1cf7eb59ea20', NULL, '1c327252-1329-448d-96c3-e4cf562a2632', 'Additional clarification indicated'
);

INSERT INTO dbo.application_feature (
    feature_uuid, age, height_in_cm, weight_in_kg, BMI,
    smoker, drugs, hobby_score, physical_health_score,
    psychological_health_score, medication_health_score, restrictions_score
)
VALUES (
    '5fdba87b-6aa8-4d4e-be72-c71f379abea2', 35, 172.00, 73.90, 23,
    0, 0, 8, 8, 9, 1, 5
);

INSERT INTO dbo.application (
    application_uuid, fk_form_id, fk_feature_id, status
)
VALUES (
    '1d572124-0457-4e21-8dc2-ea2a21e19535', NULL, '5fdba87b-6aa8-4d4e-be72-c71f379abea2', 'Acceptance'
);

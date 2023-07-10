<?php 

    /*
    * Plugin Name:       Questionnaire Web Form
    * Plugin URI:        https://example.com/plugins/QWF_plugin/
    * Description:       Handle submission forms of QW
    * Version:           1.10.3
    * Requires at least: 5.2
    * Requires PHP:      7.2
    * Author:            Thomas Berthiaume
    * Author URI:        https://mondata.ai/
    * License:           GPL v2 or later
    * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
    * Text Domain:       QWF_plugin
    * Domain Path:       /languages
    */

    //only activate plugin on specific redirect page: formulaire-web-rapport
    function njform_filter_content( $content ) {
        if (is_page('formulaire-web-rapport')) {

            //load the submission selected
            //$sub = Ninja_Forms()->form( 5 )->get_sub( 2 );
            //$sub2 = Ninja_Forms()->form()->get_sub( 2 );

            //get the fields
            //$fields = Ninja_Forms()->form( 5 )->get_fields();

            //iterate over all sub in form ( 5 )
            //Ninja_Forms()->form( 1 )->get_subs(); //https://developer.ninjaforms.com/codex/submissions/

            $form_id = 5;
            $submissions = Ninja_Forms()->form( $form_id )->get_subs();
            if ( is_array( $submissions ) && count( $submissions ) > 0 ) {
                
                // Get first element of array; latest submission
                $latest_submission = reset( $submissions );
                
                // Returns array with all submission values
                //$all_fields = $latest_submission->get_field_values();
                //print_r( $all_fields );

                //for each categories: get and regroup their own individual scores

                //Inventaire des renseignements personnels
                $sub_res[0] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Débuter rapidement un inventaire des renseignements personnels collectés. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 22 pour plus d'actions concrètes sur le sujet.", "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Documenter les mises à jour de l'inventaire et intégrer cette obligation à un processus clair et détaillé. - Mettre en place des contrôles pour gérer les accès aux renseignements personnels - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 22 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations: - Documenter les mises à jour de l'inventaire et intégrer cette obligation à un processus clair et détaillé. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 22 pour plus d'actions concrètes sur le sujet.",
                "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $single_field[0] = $latest_submission->get_field_value( '1_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835705160' );

                //Responsable de la protection des renseignements personnels
                $sub_res[1] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Débuter les démarches sans tarder afin de trouver un partenaire de confiance qui pourra vous aider à respecter vos obligations. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 16 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Définir quelles seront les nouvelles responsabilités associées à la fonction de Responsable de la protection des renseignements personnels au sein de votre entreprise afin de s'assurer que la personne qui exercera ce rôle a le temps et les qualifications nécessaires pour le remplir adéquatement. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 16 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Prévoir la délégation officielle des fonctions par écrit. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 16 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $sub_res[2] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Débuter les démarches sans tarder afin de trouver un partenaire de confiance qui pourra vous aider à définir vos obligations. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 16 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Définir quelles seront les nouvelles responsabilités associées à la fonction de Responsable de la protection des renseignements personnels au sein de votre entreprise afin de s'assurer que la personne qui exercera ce rôle a le temps et les qualifications nécessaires pour le remplir adéquatement. - Identifier formellement de qui cette personne va relever. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 16 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.   Recommandations:  - S'assurer que votre personne responsable comprenne bien son rôle et ses responsabilités afin qu'elle puisse se mettre au travail rapidement.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 16 pour plus d'actions concrètes sur le sujet."
                ,"Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $single_field[1] = $latest_submission->get_field_value( '2_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835714051' );
                $single_field[2] = $latest_submission->get_field_value( '3_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835718646' );

                //Politiques et pratiques en matière de protection des renseignements personnels
                $sub_res[3] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Si vous avez des employés, vous collectez assurément des renseignements personnels. N'hésitez pas à aller chercher de l'aide à l'externe pour vous assurer de respecter vos obligations en matière de protection des renseignements personnels. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco aux pages 18 et 31 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - S'assurer que vos politiques contiennent toutes les informations requises et n'hésitez pas à aller chercher de l'aide à l'externe pour ce faire.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco aux pages 18 et 31 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - S'assurer de prévoir un processus de mise à jour périodique de vos politiques et pratiques afin qu'elles évoluent bien dans le temps.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco aux pages 18 et 31 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $sub_res[4] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Mettre en place un processus afin de vous assurer de mettre à jour vos politiques et pratiques en matière de protection des renseignements personnels de manière périodique. - S'assurer de communiquer la politique aux personnes concernées et de bien identifier leurs rôles et leurs responsabilités en lien avec la politique.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco aux pages 18 et 31 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Mettre à jour vos politiques et pratiques en matière de protection des renseignements personnels de manière périodique, même si aucun changement important n'a eu lieu dans vos activités. - Communiquer les modifications aux politiques à tous les employés.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco aux pages 18 et 31 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Communiquer les modifications aux politiques à tous les employés. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco aux pages 18 et 31 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $single_field[3] = $latest_submission->get_field_value( '4_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835723603' );
                $single_field[4] = $latest_submission->get_field_value( '5_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835728925' );

                //Sensibilisation
                $sub_res[5] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Combiner la sensibilisation en matière de protection des renseignements personnels à d'autres formations ou activités de votre entreprise. - Inclure la formation en sécurité et en protection des renseignements personnels aux rôles et responsabilités de vos employés et y référer dans les évaluations de performance annuelles. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 24 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Rendre la formation obligatoire pour les employés traitant des renseignements personnels dans le cadre de leurs fonctions. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 24 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Rendre la formation obligatoire pour tous les employés de l'entreprise. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 24 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $sub_res[6] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Combiner la sensibilisation en matière de protection des renseignements personnels à d'autres formations ou activités de votre entreprise. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 24 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Prévoir au moins une activité de sensibilisation par année visant tous les employés de l'entreprise. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 24 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Faire de la sensibilisation de manière continue aux employés de l'entreprise. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 24 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $single_field[5] = $latest_submission->get_field_value( '6_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835736236' );
                $single_field[6] = $latest_submission->get_field_value( '7_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835741180' );

                //Mesures de sécurité
                $sub_res[7] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Avec l’aide de votre inventaire de renseignements personnels, s'assurer d'identifier à quels endroits se trouvent les renseignements personnels que votre entreprise détient et quelles sont les mesures de sécurité en place pour chacun de ces endroits."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations: - Communiquer avec votre fournisseur de service actuel afin de vous assurer de bien comprendre quelles sont vos mesures de sécurité en place. - Avec l'aide d'un partenaire de confiance, identifier les vulnérabilités sur lesquelles travailler. "
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations: - S'assurer que les mesures de sécurité en place respectent les meilleures pratiques en matière de cybersécurité en fonction d'un cadre reconnu en la matière. - Réaliser des audits de sécurité de manière ponctuelle."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $single_field[7] = $latest_submission->get_field_value( '8_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835749098' );

                //Gestion des incidents
                
                $sub_res[8] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Faire équipe avec un partenaire de confiance afin de vous aider dans la mise en place d'un processus de gestion des incidents pour votre entreprise.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Faire des simulations d'incidents avec vos équipes afin de tester et d'améliorer votre processus de gestion des incidents. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Réaliser des exercices de manière périodique afin de favoriser l'amélioration continue de votre processus de gestion des incidents. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $sub_res[9] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Préparer un document vous permettant de documenter les incidents de confidentialité afin d'être prêt lorsque cela se produira. La question n'est pas de savoir si un incident surviendra, mais plutôt quand il surviendra! - Avoir en place un service de détection et réponse aux incidents au sein de votre entreprise. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Documenter tous les incidents, peu importe leur ampleur. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Documenter tous les incidents, peu importe leur ampleur, et ce, sans exception. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $sub_res[10] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Aller chercher de l'aide d'experts pour vous aider à déterminer vos obligations légales de notification. - Élaborer un processus de notification même si vous n'avez encore jamais vécu d'incident nécessitant une notification. Il vaut toujours mieux se préparer avant qu'un incident ne survienne. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Élaborer un processus formel de notification. Il vaut toujours mieux se préparer avant qu'un incident ne survienne. - Le Responsable de la protection des renseignements personnels devrait avoir la charge de s’assurer que la notification adéquate a été faite auprès de la Commission d’accès à l’information et des personnes concernées en cas d’incident de confidentialité présentant un risque de préjudice sérieux.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - S'assurer que votre processus de notification est conforme à toutes vos obligations légales de notification. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 20 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!");
                $single_field[8] = $latest_submission->get_field_value( '9_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835756263' );
                $single_field[9] = $latest_submission->get_field_value( '10_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835761175' );
                $single_field[10] = $latest_submission->get_field_value( '11_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835765802' );

                //Consentement
                $sub_res[11] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Identifier les situations où votre entreprise collecte des renseignements personnels et s'assurer que le consentement des personnes concernées est obtenu dans tous les cas.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 35 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Lors de la révision de votre processus d'obtention du consentement, faire appel à des experts afin de vous assurer qu'il respecte toutes les exigences législatives applicables.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 35 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - S'assurer de communiquer en termes simples et clairs toutes les informations nécessaires avant l'obtention du consentement. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 35 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $sub_res[12] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Mettre en place un processus qui vous permettra de documenter l'obtention du consentement à la collecte de renseignements personnels.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 35 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Mettre en place un processus qui vous permettra de documenter l'obtention du consentement à la collecte de renseignements personnels pour chaque personne concernée. S'assurer d'avoir accès à l'historique et aux preuves des consentements obtenus. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 35 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Documenter le retrait du consentement des personnes concernées. Cela vous permettra d'avoir l'historique complet et les preuves de tous les consentements, obtenus et retirés. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 35 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[11] = $latest_submission->get_field_value( '12_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835774401' );
                $single_field[12] = $latest_submission->get_field_value( '13_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835778954' );

                //Accès et rectification
                $sub_res[13] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Mettre en place un processus d'accès et de rectification des renseignements personnels pour les personnes concernées.  - Ne pas hésiter à aller chercher de l'aide d'experts, au besoin."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Rendre les coordonnées pour vous joindre ainsi que les étapes à suivre pour accéder et/ou rectifier les renseignements personnels accessibles facilement aux personnes concernées. "
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Permettre aux personnes concernées d'accéder à leurs renseignements personnels de manière autonome et de les rectifier par eux-mêmes, au besoin. "
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[13] = $latest_submission->get_field_value( '14_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835787177' );

                //Conservation
                $sub_res[14] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Mettre à jour vos politiques afin de prévoir la durée de conservation des renseignements personnels que votre entreprise collecte.  - Ne pas hésiter à consulter des experts pour vous aider à mettre à jour vos politiques, au besoin.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 27 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Mettre en place un calendrier formel de conservation des renseignements personnels que votre entreprise collecte ainsi qu'un processus de destruction et/ou d'anonymisation une fois la durée de conservation expirée. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 27 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - S'assurer que vos processus de destruction et/ou d'anonymisation respectent les meilleures pratiques existantes et que vos politiques et pratiques sont mises à jour périodiquement afin de maintenir ces meilleures pratiques en continu.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 27 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[14] = $latest_submission->get_field_value( '15_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835794045' );

                //Demandes d'information et processus de traitement des plaintes
                $sub_res[15] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Mettre en place un processus formel vous permettant de répondre aux demandes d'informations des personnes concernées à propos de leurs renseignements personnels ainsi qu'un processus de traitement des plaintes.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 29 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Si vous avez déjà un service à la clientèle en place au sein de votre entreprise, intégrer le processus de traitement des plaintes relatives aux renseignements personnels à ces fonctions actuelles. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 29 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Publier les coordonnées ainsi que les étapes à suivre pour une demande d'informations ou pour faire une plainte de manière accessible sur votre site web. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 29 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[15] = $latest_submission->get_field_value( '16_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835800246' );

                //Évaluations de facteurs relatifs à la vie privée
                $sub_res[16] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Aller chercher de l'aide d'experts à l'externe afin de bien comprendre vos obligations en matière d'Évaluations de facteurs relatifs à la vie privée et dans quelles situations il sera nécessaire d'en réaliser. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 33 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Aller chercher de l'aide d'experts afin de vous assurer que vos processus actuels respectent vos obligations en matière de protection des renseignements personnels.  - Avoir recours à des modèles et/ou gabarits pour documenter tous les éléments requis avant de débuter un nouveau projet impliquant des renseignements personnels. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 33 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Optimiser le processus en place afin de réaliser une Évaluation de facteurs relatifs à la vie privée à chaque fois que requis.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 33 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[16] = $latest_submission->get_field_value( '17_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835806832' );

                //Fournisseurs de services
                $sub_res[17] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Des vérifications de base afin de connaître de quelle manière vos fournisseurs de services traitent les renseignements personnels que vous leur communiquez sont essentielles. - Ne pas hésiter à demander de l'aide de spécialistes afin de déterminer quelles vérifications devraient être faites et de quelle manière. "
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Mettre en place des ententes écrites avec vos fournisseurs de services à qui vous communiquerez des renseignements personnels prévoyant notamment que les renseignements personnels seront uniquement utilisés dans le cadre du mandat confié, qu'ils bénéficieront de mesures de sécurité adéquates, que vous serez avisés en cas d'atteinte à la confidentialité de ces renseignements et qu'ils seront remis ou détruits lorsque le mandat prendra fin."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Rendre ce processus systématique pour tous vos fournisseurs de services, peu importe la quantité de renseignements personnels communiqués."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[17] = $latest_submission->get_field_value( '18_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835815009' );

                //Désindexation
                $sub_res[18] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Offrir la possibilité aux personnes concernées de détruire les renseignements personnels que vous détenez à leur sujet lorsque cela est possible.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 37 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Avec l'aide de spécialistes, évaluer les implications et les délais pour mettre en place un processus de désindexation. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 37 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Mettre en place un processus de désindexation efficace des personnes concernées de l'ensemble de vos systèmes. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 37 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[18] = $latest_submission->get_field_value( '19_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835821550' );

                //Portabilité
                $sub_res[19] = array("Vous avez encore du travail à faire. N'attendez pas avant de commencer vos efforts de mise en conformité et n'hésitez surtout pas à aller chercher l'aide dont vous avez besoin pour ce faire rapidement.   Recommandations:  - Ne pas tarder avant de débuter les démarches auprès de spécialistes. Ils vous aideront à évaluer les implications et les délais pour mettre en place un processus permettant aux personnes concernées d'obtenir une copie de leurs renseignements personnels. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 40 pour plus d'actions concrètes sur le sujet."
                , "Vous êtes sur la bonne voie, mais vos processus ont encore besoin d'être peaufinés avant d'atteindre le niveau de conformité requis. N'attendez pas avant de vous mettre au travail!  Recommandations:  - Avec l'aide de spécialistes, mettre en place un processus vous permettant de fournir une copie des renseignements personnels que vous détenez aux personnes concernées, dans un format intelligible. - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 40 pour plus d'actions concrètes sur le sujet."
                , "Vous y êtes presque! Un travail de mise à niveau et d'optimisation de vos processus sera tout de même nécessaire et fera toute la différence afin d'atteindre un niveau de conformité exemplaire.  Recommandations:  - Implanter un processus vous permettant de fournir les renseignements personnels dans un format technologique structuré.  - Consulter le Guide pratique sur l'application de la Loi 25 de Cybereco à la page 40 pour plus d'actions concrètes sur le sujet."
                , "Continuez votre bon travail. Les autres entreprises devraient prendre exemple sur vous en matière de conformité!
                ");
                $single_field[19] = $latest_submission->get_field_value( '20_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835829079' );

                //for loop that loops over every answers to atribute the correct recommendation
                for($x = 0; $x < 20; $x++) {
                    if (strpos( $single_field[x], 'Vous avez encore du travail faire.' )) {
                        $label[x] = $sub_res[x][0]
                        continue

                    } if (strpos( $single_field[x], 'Vous tes sur la bonne voie mais vos processus ont encore besoin dtre peaufins avant datteindre le niveau de conformit requis.' )) {
                        $label[x] = $sub_res[x][1]
                        continue

                    } if (strpos( $single_field[x], 'Vous y tes presque Un travail de mise niveau et doptimisation de vos processus sera tout de mme ncessaire et fera toute la diffrence afin datteindre un niveau de conformit exemplaire.' )) {
                        $label[x] = $sub_res[x][2]
                        continue

                    } if (strpos( $single_field[x], 'Continuez votre bon travail.' )) {
                        $label[x] = $sub_res[x][3]
                        continue

                    }
                  }


                
                // To get/display single value
                //$single_field = $latest_submission->get_field_value( '1_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835705160' );
                return <<<HTML
                    <html>
                        <body>
                            <h1>bienvenue sur ce rapport!</h1>
                            <h3>{$single_field[0]}</h3>
                        </body>
                    </html>
                HTML;
            }

            

            //get entries using field keys (modify)
            //$field_key = "1_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835705160";

            //$field_values = $sub->get_field_values();

            //$field_values2 = $sub2->get_field_values();
            
            //$string_version = implode(',', $field_values);
            //$string_version2= implode(',', $fields);
            //$string_version3= implode(',', $field_values2);
            //echo $string_version3;
            //return 'This is the content: ' . $content . '. And this is the sub(5) all field values: ' . $string_version;
    
           
        } else {
            return $content;

        }
        
    }
    add_filter( 'the_content', 'njform_filter_content' );

?>
    
    

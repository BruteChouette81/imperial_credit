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
?>



<?php 
 //function to compare funcCode to score (-1)
function checkScores($results) {
  $list_of_scores = [];
  foreach($results as $id => $res) {
    if (str_contains( $res, 'Vous avez' )) {
      $list_of_scores[$id] = 0;
    } if (str_contains( $res,  'Vous y tes presque')) {
      $list_of_scores[$id] = 1;
    } if (str_contains( $res, 'bonne voie' )) {
      $list_of_scores[$id] = 2;
    }
    if (str_contains( $res, 'Continuez votre bon travail' )) {
      $list_of_scores[$id] = 3;
    }
  }
  return $list_of_scores;

}

?>

<?php
function displayPie($scores, $lang, $class)
{
  $a_count = 0;
  $b_count = 0;
  $c_count = 0;
  $d_count = 0;
  $total_count = 0;
  foreach ($scores as $key => $score) {
	if ($score !== NULL) {
		$total_count++;
			switch ($score) {
			  case 0:
				
				$a_count++;
				break;
			  case 1:
				
				$b_count++;
				break;
			  case 2:
				
				$c_count++;
				break;
			  case 3:
				
				$d_count++;
				break;
			  default: // do nothing;
				 break;
    		}
	}
  }

  $percent_a = $a_count ? round(($a_count / $total_count) * 100) : 0;
  $percent_b = $b_count ? round(($b_count / $total_count) * 100) : 0;
  $percent_c = $c_count ? round(($c_count / $total_count) * 100) : 0;
  $percent_d = $d_count ? round(($d_count / $total_count) * 100) : 0;

  $pie_a = $percent_a;
  $pie_b = $pie_a + $percent_b;
  $pie_c = $pie_b + $percent_c;
  $pie_d = 100 - $percent_d;

  $degree_a = ($percent_a * 3.6) / 2;
  $degree_b = ($degree_a * 2) + (($percent_b * 3.6) / 2);
  $degree_c = $degree_b + (($percent_b * 3.6) / 2) + (($percent_c * 3.6) / 2);
  $degree_d = $degree_c + (($percent_c * 3.6) / 2) + (($percent_d * 3.6) / 2);
?>

  <div class="pie <?= $class; ?>" style="--percent-a: <?= $pie_a ?>%; --percent-b: <?= $pie_b ?>%; --percent-c: <?= $pie_c ?>%; --percent-d: <?= $pie_d ?>%;"></div>
  <span class="pie-percent <?= $class; ?>" style="--degree: <?= $degree_a ?>deg"><span class="percent" style="--degree: -<?= $degree_a ?>deg"><?= $percent_a ? $percent_a . '%' : '' ?></span></span>
  <span class="pie-percent <?= $class; ?>" style="--degree: <?= $degree_b ?>deg"><span class="percent" style="--degree: -<?= $degree_b ?>deg"><?= $percent_b ? $percent_b . '%' : '' ?></span></span>
  <span class="pie-percent white <?= $class; ?>" style="--degree: <?= $degree_c ?>deg"><span class="percent" style="--degree: -<?= $degree_c ?>deg"><?= $percent_c ? $percent_c . '%' : '' ?></span></span>
  <span class="pie-percent <?= $class; ?>" style="--degree: <?= $degree_d ?>deg"><span class="percent" style="--degree: -<?= $degree_d ?>deg"><?= $percent_d ? $percent_d . '%' : '' ?></span></span>
  <div class="pie-legend <?= $class; ?>">
    <ul>
      <li data-color="apprentice" data-bg-img="apprentice"><?= $lang === 'en' ? 'Apprentice' : 'Apprenti'; ?></li>
      <li data-color="intermediate" data-bg-img="intermediate"><?= $lang === 'en' ? 'Intermediate' : 'Intermédiaire'; ?></li>
      <li data-color="expert" data-bg-img="expert"><?= $lang === 'en' ? 'Expert' : 'Expert'; ?></li>
      <li data-color="leader" data-bg-img="leader"><?= $lang === 'en' ? 'Leader' : 'Leader'; ?></li>
    </ul>
  </div>
<?php } ?>

<?php

function njform_filter_rapport( $content ) {
  if (is_page('test-rapport-formulaire')) {

    ?>
    <script src="/wp-content/plugins/mondata/pagedjs/paged.polyfill.js"></script>
    <script src="/wp-content/plugins/mondata/templates/toc.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
    <link href="/wp-content/plugins/mondata/pagedjs/interface.css" rel="stylesheet" type="text/css" />
    <link href="/wp-content/plugins/mondata/templates/pie-chart.css" rel="stylesheet" type="text/css" />
    <link href="/wp-content/plugins/mondata/templates/pdf-options.css" rel="stylesheet" type="text/css" />
    <link href="/wp-content/plugins/mondata/templates/pdf-style.css" rel="stylesheet" type="text/css" />

    <script>
    class handlers extends Paged.Handler {
        constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        }

        beforeParsed(content) {
        createToc({
            content: content,
            tocElement: "#toc",
            titleElements: [".toc-item", ".toc-sub-item"],
        });
        }
    }
    Paged.registerHandlers(handlers);
    </script>

<?php
  //code to get info from wordPress DB
  /*
  if (!isset($_GET['report_id'])) {
    echo '<h2 style="color:red">Missing report_id</h2>';
    exit;
  }

  global $wpdb;

  $report_id = $_GET['report_id'];
  $table_general_texts = $wpdb->prefix . "mondata_cybertaskforce_general_texts";
  $table_sections = $wpdb->prefix . "mondata_cybertaskforce_sections";
  $table_questions = $wpdb->prefix . "mondata_cybertaskforce_questions";
  $table_results = $wpdb->prefix . "mondata_cybertaskforce_results";
  $general_texts = $wpdb->get_row("SELECT * FROM  $table_general_texts");
  $sections = $wpdb->get_results("SELECT * FROM  $table_sections");
  $questions = $wpdb->get_results("SELECT * FROM  $table_questions");
  $result = $wpdb->get_row("SELECT * FROM  $table_results WHERE id = $report_id");

  */

  //general text: manual getting
  $intro_fr = "Nous vous remercions d'avoir pris le temps de répondre à quelques questions concernant votre posture actuelle en matière de cybersécurité et sur votre niveau de préparation. Sur la base de vos réponses, ce rapport fournit des recommandations et décrit les possibilités de protéger davantage vos systèmes ainsi que les informations sensibles que vous détenez, telles que les données des clients et des employés.

  Les cyberattaques et les vols de données dans le secteur de l'assurance augmentent en fréquence et en gravité. La question n'est pas de savoir si vous serez attaqué, mais quand cela se produira et, plus important encore, dans quelle mesure êtes-vous aptes à défendre vos données et à faire face aux conséquences en cas de vol. C'est pourquoi il est essentiel d'investir dans des contrôles de cybersécurité et des processus robustes pour protéger les systèmes et les points d'accès contre une cyberattaque.";

  $who_we_are_fr = "Avec 20 ans d'expérience en cybersécurité, Mondata rassemble les spécialistes de la cybersécurité dont vous avez besoin pour vous garder au fait des cybermenaces d'aujourd'hui. Mondata est le partenaire de confiance en cybersécurité de centaines d'entreprises. Nous nous engageons à rendre la cybersécurité accessible à toutes les organisations, qu’elles soient petites ou grandes.";

  $what_we_do_fr = "Notre objectif est de vous fournir, de manière simple et efficace, un maximum d'informations sur votre posture de cybersécurité. Ce rapport vous proposera également des améliorations pour renforcer votre cybersécurité.

  Le questionnaire est aligné sur le cadre de référence pour la cybersécurité proposée par le National Institute of Standards and Technology (« NIST »). Le cadre de cybersécurité du NIST aide les entreprises de toutes tailles à mieux comprendre, gérer et réduire leurs risques de cybersécurité et à protéger leur infrastructure et leurs données. Nous avons également aligné nos recommandations sur les normes reconnues de l'industrie.

  Il est important de comprendre que cet exercice n'est pas un audit de cybersécurité. Il s’agit davantage d’un exercice de sensibilisation. Il vous permettra d'évaluer l'état actuel de vos contrôles de cybersécurité par rapport aux meilleures pratiques de l'industrie. Veuillez également noter qu'il ne s'agit pas d'une évaluation exhaustive de la préparation à la cybersécurité de votre cabinet de courtage. Il vous est fourni à titre informatif uniquement.";

  $how_to_read_this_report_fr = "Chaque question comportait quatre (4) réponses possibles, chacune reflétant divers degrés de préparation à la cybersécurité. Sur la base de vos réponses, vos recommandations ont été décrites dans le rapport.";


  //legend 
  $apprentice_legend_fr = "D'après votre réponse, vous êtes au début de votre parcours de cybersécurité. Vous pouvez améliorer la posture de cybersécurité de votre cabinet de courtage en mettant en œuvre plusieurs des bonnes pratiques décrites ci-dessous.";

  $intermediate_legend_fr = "D'après votre réponse, vous avez déjà amorcé votre parcours de cybersécurité. Nous vous encourageons fortement à analyser nos recommandations et à apporter des améliorations là où elles s'avèrent nécessaires.";

  $expert_legend_fr = "Sur la base de votre réponse, vous avez développé de bonnes habitudes et vous êtes bien avancé dans votre parcours de cybersécurité. Nous vous suggérons de consulter nos recommandations et de voir où des améliorations peuvent être apportées.";

  $leader_legend_fr = "Sur la base de votre réponse, vous avez développé de fortes habitudes et vous êtes un leader parmi vos pairs. Bien que vos mesures de cybersécurité soient avancées, elles doivent être utilisées efficacement et surveillées régulièrement. Nous vous suggérons de consulter nos recommandations et d'évaluer si des contrôles supplémentaires sont nécessaires dans votre contexte.";

  $after_reading_this_report_fr = "Après avoir lu ce rapport, vous vous sentirez peut-être à l'aise avec la posture de cybersécurité de votre cabinet de courtage. Vous pouvez également penser qu'il y a des domaines importants dans lesquels vous pourriez améliorer la posture de cybersécurité de votre cabinet de courtage. Vous vous demandez peut-être quelles activités devraient être priorisées et quels seront les coûts associés à cette amélioration. Un spécialiste de la cybersécurité d'Intact vous contactera sous peu pour répondre à toutes vos questions sur ce rapport et pour discuter des options potentielles pour vous afin de poursuivre votre parcours en cybersécurité.";

  $top_3_cybersecurity_posture_concerns_fr = "Un programme de cybersécurité est un ensemble de contrôles de sécurité conçus pour empêcher une cyberattaque réussie contre votre cabinet de courtage et faciliter un recouvrement rapide et complet. Ce rapport met en évidence les principaux contrôles de cybersécurité recommandés par les normes de l'industrie.

  Nous aimerions attirer votre attention sur notre top 3 des contrôles de cybersécurité (questions 4, 5, et 9 de ce rapport) :

  Protection des points d’accès

  Les postes de travail et les serveurs de votre cabinet de courtage sont-ils protégés par des solutions de protection contre les logiciels malveillants?

  Authentification

  Votre cabinet de courtage utilise-t-il l'authentification à deux facteurs pour les systèmes de votre entreprise contenant de l’information sensible ou personnelle (incluant BMS ou d’autres systèmes de partenaires)?

  Sauvegarde et restauration

  Est-ce que vous vous assurez que votre cabinet de courtage dispose de sauvegardes quotidiennes effectuées par votre équipe ou un partenaire?

  Si le temps ou le budget limitent les contrôles que vous pouvez mettre en place, nous vous recommandons de prioriser ces contrôles afin de vous assurer qu’ils soient en place et qu’ils bénéficient d'un haut niveau de maturité, car ils compliquent la vie des cybercriminels.";

  $executive_report_summary_fr = "Vous avez répondu à 20 questions couvrant 14 sujets importants en matière de cybersécurité. Pour chacune des questions, le schéma suivant illustre votre niveau de cyberrisque par rapport à chacun des 14 sujets abordés.

  Le niveau de cyberrisque présenté par le diagramme est basé sur une seule question. Il est donc possible qu'il ne capte pas toujours 100% de la réalité de votre cabinet de courtage.";


  //Charts 
  $overall_cybersecurity_posture_level_summary_part_1_fr = "Le diagramme suivant illustre la répartition de vos réponses sur les 17 sujets. Les réponses de niveaux Apprenti et Intermédiaire représentent la proportion de sujets couverts où des actions concrètes peuvent devoir être priorisées pour réduire les risques de cybersécurité.";

  $overall_cybersecurity_posture_level_summary_part_2_fr = "Les sections suivantes du rapport présenteront les 17 sujets plus en détail. Vos réponses seront présentées avec des suggestions pour la mise en œuvre des meilleures pratiques. Vous pourrez évaluer votre niveau de confort avec votre réponse à chacun des 17 sujets couverts par le rapport.";


  //multiple choices responses
  $feedback_intro_a_fr = "En se basant sur votre réponse, vous êtes au début de votre parcours en cybersécurité en matière de [topic]. Vous pouvez améliorer la posture de sécurité de votre cabinet de courtage en mettant en place une ou plusieurs des meilleures pratiques identifiées ci-dessous.";

  $feedback_intro_b_fr = "En se basant sur votre réponse, vous avez déjà débuté votre parcours en cybersécurité en matière de [topic]. Vous pouvez améliorer la posture de sécurité de votre cabinet de courtage en mettant en place une ou plusieurs des meilleures pratiques identifiées ci-dessous.";

  $feedback_intro_c_fr = "En se basant sur votre réponse, vous avez développé de bonnes habitudes et vous êtes sur la bonne voie dans votre parcours de cybersécurité en matière de [topic]. Vous pouvez améliorer la posture de sécurité de votre cabinet de courtage en mettant en place une ou plusieurs meilleures pratiques identifiées ci-dessous.";

  $feedback_intro_d_fr = "En se basant sur votre réponse, vous avez développé de solides habitudes et vous êtes un leader parmi vos pairs en matière de [topic]. La cybersécurité étant en constante évolution, vous devez vous assurer de rester à jour avec ces meilleures pratiques.";

  $next_step_fr = "Nous espérons vous avoir apporté de la valeur grâce à nos explications sur les contrôles de cybersécurité et le contexte que nous avons fourni autour de chaque sujet. La cybersécurité est un domaine complexe.

  Nous tenons à vous remercier d'avoir pris le temps de lire nos recommandations et d'évaluer l'importance de nos suggestions pour votre organisation, ainsi que pour la protection des données de vos clients.

  Nous comprenons que chaque organisation est unique et que certains éléments du rapport peuvent ne pas refléter adéquatement votre réalité. Soyez assuré que, si vous en avez besoin, nos experts seront là pour démystifier les éléments du rapport et vous accompagner dans votre parcours de cybersécurité.";


  //code for ninja form included DB
  $form_id = 5;
  //get questions 
  $questions = Ninja_Forms()->form( $form_id )->get_fields();
        //$latest_questions = reset( $questions );
        //print_r($latest_questions);

  //get all the questions for the submissions
  $options[0] = $questions[52]->get_setting( 'options' );
  $options[1] = $questions[58]->get_setting( 'options' );
  $options[2] = $questions[59]->get_setting( 'options' );
  $options[3] = $questions[60]->get_setting( 'options' );
  $options[4] = $questions[61]->get_setting( 'options' );
  $options[5] = $questions[62]->get_setting( 'options' );
  $options[6] = $questions[63]->get_setting( 'options' );
  $options[7] = $questions[64]->get_setting( 'options' );
  $options[8] = $questions[65]->get_setting( 'options' );
  $options[9] = $questions[66]->get_setting( 'options' );
  $options[10] = $questions[67]->get_setting( 'options' );
  $options[11] = $questions[68]->get_setting( 'options' );
  $options[12] = $questions[69]->get_setting( 'options' );
  $options[13] = $questions[70]->get_setting( 'options' );
  $options[14] = $questions[71]->get_setting( 'options' );
  $options[15] = $questions[72]->get_setting( 'options' );
  $options[16] = $questions[73]->get_setting( 'options' );
  $options[17] = $questions[74]->get_setting( 'options' );
  $options[18] = $questions[75]->get_setting( 'options' );
  $options[19] = $questions[56]->get_setting( 'options' );

  //get results
  $submissions = Ninja_Forms()->form( $form_id )->get_subs();               
  // Get first element of array; latest submission
  $latest_submission = reset( $submissions );

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

  //Date:
  //$single_field[20] = $latest_submission->get_field_value( 'date' ); //test

  $report_id = $latest_submission->get_id();

  $scores = array();
  $scores = checkScores($single_field);

  //array of the corresponding tag for each questions 
  $sections = array("Inventaire des renseignements personnels", "Responsable de la protection des renseignements personnels", "Responsable de la protection des renseignements personnels", "Politiques et pratiques en matière de protection des renseignements personnels", "Politiques et pratiques en matière de protection des renseignements personnels", 
  "Sensibilisation", "Sensibilisation", "Mesures de sécurité", "Gestion des incidents", "Gestion des incidents", "Gestion des incidents", "Consentement", "Consentement", "Accès et rectification", "Conservation", "Demandes d'information et processus de traitement des plaintes", 
  "Évaluations de facteurs relatifs à la vie privée", "Fournisseurs de services", "Désindexation", "Portabilité");

  $individual_sections = array("Inventaire des renseignements personnels", "Responsable de la protection des renseignements personnels", "Politiques et pratiques en matière de protection des renseignements personnels",
  "Sensibilisation", "Mesures de sécurité", "Gestion des incidents", "Consentement", "Accès et rectification", "Conservation", "Demandes d'information et processus de traitement des plaintes", 
  "Évaluations de facteurs relatifs à la vie privée", "Fournisseurs de services", "Désindexation", "Portabilité");

?>

<title>Report <?= $report_id; ?></title>

<?php 
if (!isset($latest_submission)) {
  echo '<h2 style="color:red">No results found for id ' . $report_id . '</h2>';
  exit;
}

//add language support
//$lang = $result->lang;
$lang = "fr";

//$answers = unserialize($result->serialized_answers);
//time zone: America/New_York
date_default_timezone_set('America/New_York');
//<?= $result->issuer_name; 
setlocale(LC_TIME, "fr_CA.UTF8");


?>

<div class="cover-title">
  <p class="main-title"><?= $lang === 'en' ? 'Your cybersecurity posture' : 'Votre posture de cybersécurité'; ?></p>
  <div class="title-divider"></div>
  <p class="sub-title"><?= $lang === 'en' ? 'Survey report' : 'Rapport du sondage'; ?></p>
</div>

<table class="cover-metadata">
  <tr>
    <td><?= $lang === 'en' ? 'Created for:' : 'Créé pour :'; ?></td>
    <td> Test </td>
  </tr>
  <tr>
    <td>Date:</td>
    <td><?= $lang === 'en' ? date("F jS, Y", time()) : strftime("F j, Y", time()) ?></td>
  </tr>
</table>

<div class="pagebreak"></div>

<div class="toc-wrapper">
  <h1><?= $lang === 'en' ? 'Table of contents' : 'Table des matières'; ?></h1>
  <div id="toc"></div>
</div>

<div class="reset-page-counter"></div>

<h1 class="toc-item">INTRODUCTION</h1>
<?= stripslashes(wpautop($intro_fr)); ?>
<br />

<h2 class="toc-sub-item"><?= $lang === 'en' ? 'Who we are' : 'Qui nous sommes'; ?></h2>
<?= stripslashes(wpautop($who_we_are_fr)); ?>
<br />

<h2 class="toc-sub-item"><?= $lang === 'en' ? 'What we do' : 'Ce que nous faisons'; ?></h2>
<?= stripslashes(wpautop($what_we_do_fr)); ?>
<br />

<div class="pagebreak"></div>

<h2 class="toc-sub-item"><?= $lang === 'en' ? 'How to read this report' : 'Comment lire ce rapport'; ?></h2>
<?= stripslashes(wpautop($how_to_read_this_report_fr)); ?>

<table class="level-legend-table">
  <thead>
    <tr>
      <th><?= $lang === 'en' ? 'Legend' : 'Légende'; ?></th>
      <th><?= $lang === 'en' ? 'Cybersecurity Posture Level' : 'Niveau de posture de cybersécurité'; ?></th>
      <th><?= $lang === 'en' ? 'Definition ' : 'Définition '; ?></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/wp-content/plugins/mondata/images/apprentice_icon.svg"></td>
      <td><?= $lang === 'en' ? 'Apprentice' : 'Apprenti'; ?></td>
      <td><?= stripslashes(wpautop($apprentice_legend_fr)); ?></td>
    </tr>
    <tr>
      <td><img src="/wp-content/plugins/mondata/images/intermediate_icon.svg"></td>
      <td><?= $lang === 'en' ? 'Intermediate' : 'Intermédiaire'; ?></td>
      <td><?= stripslashes(wpautop($intermediate_legend_fr)); ?></td>
    </tr>
    <tr>
      <td><img src="/wp-content/plugins/mondata/images/expert_icon.svg"></td>
      <td><?= $lang === 'en' ? 'Expert' : 'Expert'; ?></td>
      <td><?= stripslashes(wpautop($expert_legend_fr)); ?></td>
    </tr>
    <tr>
      <td><img src="/wp-content/plugins/mondata/images/leader_icon.svg"></td>
      <td><?= $lang === 'en' ? 'Leader' : 'Leader'; ?></td>
      <td><?= stripslashes(wpautop($leader_legend_fr)); ?></td>
    </tr>
  </tbody>
</table>

<h2 class="toc-sub-item"><?= $lang === 'en' ? 'After reading this report' : 'Après la lecture de ce rapport'; ?></h2>
<?= stripslashes(wpautop($after_reading_this_report_fr)); ?>
<br />

<h2 class="toc-sub-item"><?= $lang === 'en' ? 'Top 3 cybersecurity posture concerns' : 'Top 3 des contrôles de cybersécurité'; ?></h2>
<?= stripslashes(wpautop($top_3_cybersecurity_posture_concerns_fr)); ?>
<br />

<div class="pagebreak"></div>

<h1 class="toc-item"><?= $lang === 'en' ? 'OVERALL CYBERSECURITY POSTURE LEVEL SUMMARY' : 'POSTURE GÉNÉRALE DE CYBERSÉCURITÉ'; ?></h1>
<?= stripslashes(wpautop($overall_cybersecurity_posture_level_summary_part_1_fr)); ?>
<div class="pie-section">
  <p><?= $lang === 'en' ? 'Overall Cybersecurity Posture Level' : 'Niveau global de la posture de cybersécurité'; ?></p>
  <?= displayPie($scores, $lang, 'overall'); ?>
</div>
<?= stripslashes(wpautop($overall_cybersecurity_posture_level_summary_part_2_fr)); ?>

<div class="pagebreak"></div>

<h1 class="toc-item"><?= $lang === 'en' ? 'EXECUTIVE REPORT SUMMARY' : 'RAPPORT EXÉCUTIF SOMMAIRE'; ?></h1>
<div class="executive-summary">
  <div class="posture-details overall">
    <p><?= $lang === 'en' ? 'Cybersecurity Posture' : 'Posture de cybersécurité'; ?></p>
    <div class="posture-bar">
      <span><?= $lang === 'en' ? 'Apprentice' : 'Apprenti'; ?></span>
      <span><?= $lang === 'en' ? 'Leader' : 'Leader'; ?></span>
    </div>
    <?php foreach ($scores as $i => $score) { ?>
      <div class="bar-chart">
        <div class="label">
          <?= $sections[$i] . ' - Q' . $i + 1 ; ?>
        </div>
        <?php switch($score) {
                case 0: ?>
                <div class="bar answer-a"></div>
          <?php break; 
                case 1: ?>
                <div class="bar answer-b"></div>
          <?php break; 
                case 2: ?>
                <div class="bar answer-c"></div>
          <?php break; 
                case 3: ?>
                <div class="bar answer-d"></div>
          <?php break;
        }?>
      </div>
    <?php } ?>
  </div>
  <div class="info">
    <div class="legend">
      <span><?= $lang === 'en' ? 'Apprentice' : 'Apprenti'; ?></span>
      <span><?= $lang === 'en' ? 'Intermediate' : 'Intermédiaire'; ?></span>
      <span><?= $lang === 'en' ? 'Expert' : 'Expert'; ?></span>
      <span><?= $lang === 'en' ? 'Leader' : 'Leader'; ?></span>
      <?= stripslashes(wpautop($executive_report_summary_fr)); ?>
    </div>
  </div>
</div>

<div class="pagebreak"></div>

<div id="results-sections">
  <?php 
 
  foreach ($individual_sections as $id => $section) {
    // for each individual sections, we need to get 
	
    if ($id == 0) {
        $plus = 1;
        $score = array();
        $score[0] = $scores[0];
        $recommendation[0] = $sub_res[$id][$score[0]];
        $answers[0] = $options[$id][$score[0]]['label']; //"value" == recommendation
    } if ($id == 1) {
        $plus = 2;
        $score[0] = $scores[$id];
        $score[1] = $scores[$id+1]; //sum of id + x = score
        $recommendation[0] = $sub_res[$id][$score[0]];
        $recommendation[1] = $sub_res[$id+1][$score[1]];
        $answers[0] = $options[$id][$score[0]]['label']; //"value" == recommendation
        $answers[1] = $options[$id+1][$score[1]]['label'];
    } if ($id == 2) {
        $plus = 4;
        $score[0] = $scores[$id+1];
        $score[1] = $scores[$id+2];
        $recommendation[0] = $sub_res[$id+1][$score[0]];
        $recommendation[1] = $sub_res[$id+2][$score[1]];
        $answers[0] = $options[$id+1][$score[0]]['label']; //"value" == recommendation
        $answers[1] = $options[$id+2][$score[1]]['label'];

    } if ($id == 3) {
        $plus = 6;
        $score[0] = $scores[$id+2]; 
        $score[1] = $scores[$id+3];
        $recommendation[0] = $sub_res[$id+2][$score[0]];
        $recommendation[1] = $sub_res[$id+3][$score[1]];
        $answers[0] = $options[$id+2][$score[0]]['label']; //"value" == recommendation
        $answers[1] = $options[$id+3][$score[1]]['label'];

    } if ($id == 4) {
        $plus = 8;
        $score[0] = $scores[$id+3];
        $score[1] = NULL;
        $recommendation[0] = $sub_res[$id+3][$score[0]];
        $recommendation[1] = NULL;
        $answers[0] = $options[$id+3][$score[0]]['label']; //"value" == recommendation
        $answers[1] = NULL;

    } if ($id == 5) {
        $plus = 9;
        $score[0] = $scores[$id+3]; 
        $score[1] = $scores[$id+4];
        $score[2] = $scores[$id+5];
        $recommendation[0] = $sub_res[$id+3][$score[0]];
        $recommendation[1] = $sub_res[$id+4][$score[1]];
        $recommendation[2] = $sub_res[$id+5][$score[2]];
        $answers[0] = $options[$id+3][$score[0]]['label']; //"value" == recommendation
        $answers[1] = $options[$id+4][$score[1]]['label'];
        $answers[2] = $options[$id+5][$score[2]]['label'];

    } if ($id == 6) {
        $plus = 12;
        $score[0] = $scores[$id+5]; 
        $score[1] = $scores[$id+6]; 
        $recommendation[0] = $sub_res[$id+5][$score[0]];
        $recommendation[1] = $sub_res[$id+6][$score[1]];
        $answers[0] = $options[$id+5][$score[0]]['label']; //"value" == recommendation
        $answers[1] = $options[$id+6][$score[1]]['label'];
        $score[2] = NULL;
        $recommendation[2] = NULL;
        $answers[2] = NULL;

    } if ($id == 7) {
        $plus = 14;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
        $score[1] = NULL;
        $recommendation[1] = NULL;
        $answers[1] = NULL;
    } if ($id == 8) {
        $plus = 15;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
    } if ($id == 9) {
        $plus = 16;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
    } if ($id == 10) {
        $plus = 17;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
    } if ($id == 11) {
        $plus = 18;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
    } if ($id == 12) {
        $plus = 19;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
    } if ($id == 13) {
        $plus = 20;
        $score[0] = $scores[$id+6];
        $recommendation[0] = $sub_res[$id+6][$score[0]];
        $answers[0] = $options[$id+6][$score[0]]['label']; //"value" == recommendation
    }
    ?>

    <h1 class="toc-item"><?= 'SECTION ' . $id . ' - ' . $section ?></h1>
    <?= stripslashes(wpautop($section)); ?>
    <table class="section-charts">
      <tr>
        <td>
          <div class="pie-section">
            <p><?= $section ?> <?= $lang === 'en' ? ' - Cybersecurity Posture Level' : ' - Niveau de posture de cybersécurité'; ?></p>
            <?= displayPie($score, $lang, 'section'); ?>
          </div>
        </td>
        <td>
          <div class="posture-details">
            <p><?= $lang === 'en' ? 'Cybersecurity Posture' : 'Posture de cybersécurité'; ?></p>
            <div class="posture-bar">
              <span><?= $lang === 'en' ? 'Apprentice' : 'Apprenti'; ?></span>
              <span><?= $lang === 'en' ? 'Leader' : 'Leader'; ?></span>
            </div>
            <?php foreach ($score as $i => $uni_score) {
			  if ($uni_score !== NULL) { ?>
              <div class="bar-chart">
                <div class="label">
                  <?= 'Q' . $i + $plus . ' '; ?>
                </div>
                <?php
					switch($uni_score) {
                        case 0: ?>
                        <div class="bar answer-a"></div>
                  <?php break; 
                        case 1: ?>
                        <div class="bar answer-b"></div>
                  <?php break; 
                        case 2: ?>
                        <div class="bar answer-c"></div>
                  <?php break; 
                        case 3: ?>
                        <div class="bar answer-d"></div>
                  <?php break;
					}?>
              </div>
            <?php }} ?>
          </div>
        </td>
      </tr>
    </table>
    <?php foreach ($answers as $i => $answer) { 
		if ($answer) {?>
      <div class="question">
        <h2 class="toc-sub-item">Question <?= $i + $plus; ?></h2>
        <i><?= $lang === 'en' ? 'You selected: ' : 'Vous avez répondu : '; ?></i>
        <i class="quote"><?= stripslashes(wpautop(($lang === 'en' ? '"' : '« ') . $answer . ($lang === 'en' ? '"' : ' »'))); ?></i>
        <br />
        <strong><?= $lang === 'en' ? 'Cybersecurity context ' : 'Contexte de cybersécurité '; ?> - </strong>
        <br />
        
        <?= stripslashes(wpautop($recommendation[$i])); ?>
      </div>
    <?php }} ?>
    <div class="pagebreak"></div>
  <?php } ?>
</div>

<h1 class="toc-item"><?= $lang === 'en' ? 'Next steps' : 'Prochaines étapes'; ?></h1>
<?= stripslashes(wpautop($next_step_fr)); ?>

<div class="pagebreak"></div>

<h1 class="toc-item"><?= $lang === 'en' ? 'List of all survey questions and possible answers' : 'Liste des questions et réponses possibles du sondage'; ?></h1>
<?php foreach ($individual_sections as $id => $section) {
  if ($id == 0) {
    $answers[0] = $options[$id]; //"value" == recommendation
  } if ($id == 1) {
    $answers[0] = $options[$id]; //"value" == recommendation
    $answers[1] = $options[$id+1];
  } if ($id == 2) {
    $answers[0] = $options[$id+1]; //"value" == recommendation
    $answers[1] = $options[$id+2];

  } if ($id == 3) {
    $answers[0] = $options[$id+3]; //"value" == recommendation
    $answers[1] = $options[$id+3];

  } if ($id == 4) {
    $answers[0] = $options[$id+3]; //"value" == recommendation
    $answers[1] = NULL;

  } if ($id == 5) {
    $answers[0] = $options[$id+3]; //"value" == recommendation
    $answers[1] = $options[$id+4];
    $answers[2] = $options[$id+5];

  } if ($id == 6) {
    $answers[0] = $options[$id+5]; //"value" == recommendation
    $answers[1] = $options[$id+6];
    $answers[2] = NULL;

  } if ($id == 7) { 
    $answers[0] = $options[$id+6]; //"value" == recommendation
    $answers[1] = NULL;
  } if ($id == 8) {
    $answers[0] = $options[$id+6]; //"value" == recommendation
  } if ($id == 9) {
    $answers[0] = $options[$id+6]; //"value" == recommendation
  } if ($id == 10) {
    
    $answers[0] = $options[$id+6];  //"value" == recommendation
  } if ($id == 11) {
    
    $answers[0] = $options[$id+6]; 
  } if ($id == 12) {
    $answers[0] = $options[$id+6]; 
  } if ($id == 13) {
    $answers[0] = $options[$id+6]; 
  }
  ?>
  <br />
  <h2><?= 'Section ' . $section ?></h2>
  <?php foreach ($answers as $i => $answer) { 
    if ($answer !== NULL) {?>
    <strong>Question <?= $i; ?></strong>
    <p><?= $lang === 'en' ? 'From the following statements, select the one that best describes your current situation.' : 'Parmi les affirmations suivantes, choisissez celle qui décrit le mieux votre situation actuelle.'; ?></p>
    <ul>
      <li><?= stripslashes(wpautop($answer[0]['label'])); ?></li>
      <li><?= stripslashes(wpautop($answer[1]['label'])); ?></li>
      <li><?= stripslashes(wpautop($answer[2]['label'])); ?></li>
      <li><?= stripslashes(wpautop($answer[3]['label'])); ?></li>
    </ul>
    <br />
  <?php }} ?>
<?php } ?>

<?php }}
    add_filter( 'the_content', 'njform_filter_rapport' );
?>
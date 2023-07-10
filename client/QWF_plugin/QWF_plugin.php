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

    //only activate plugin on specific redirect page
    function njform_filter_content( $content ) {
        if (is_page('test-formulaire')) {

            //load the submission selected
            $sub = Ninja_Forms()->form( 5 )->get_sub( 2 );
            $sub2 = Ninja_Forms()->form()->get_sub( 2 );

            //get the fields
            //$fields = Ninja_Forms()->form( 5 )->get_fields();

            //iterate over all sub in form ( 5 )
            //Ninja_Forms()->form( 1 )->get_subs(); //https://developer.ninjaforms.com/codex/submissions/

            

            //get entries using field keys (modify)
            //$field_key = "1_-_parmi_les_enonces_suivants_lequel_decrit_le_mieux_votre_situation_actuelle_1688835705160";

            $field_values = $sub->get_field_values();

            $field_values2 = $sub2->get_field_values();
            
            $string_version = implode(',', $field_values);
            //$string_version2= implode(',', $fields);
            $string_version3= implode(',', $field_values2);
            echo $string_version3;
            return 'This is the content: ' . $content . '. And this is the sub(5) all field values: ' . $string_version;
    
           
        } else {
            return $content;

        }
        
    }
    add_filter( 'the_content', 'njform_filter_content' );

?>
    
    

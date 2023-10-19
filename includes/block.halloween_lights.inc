<?php

/**
 *  BlockHalloweenLights extends BlockText
 *
 *  This class allows us to create a block of Halloween Lights.
 */
class BlockHalloweenLights extends BlockText {

  /**
   * {@inheritdoc}
   */
  function __construct($plugin_name, array $data) {
    parent::__construct($plugin_name, $data);

    $this->settings += [
      'halloweenlights' => '',
    ];
  }

  /**
   *  Sets title text on draggable block panel in Layout builder.
   */
  function getAdminTitle() {
    if (!empty($this->settings['admin_label'])) {
      return check_plain($this->settings['admin_label']);
    }

    return !empty($this->settings['title']) ? check_plain(
      $this->settings['title']
    ) : t('Halloween Lights Block');
  }

  /**
   * Returns the rendered content of this block.
   *
   * If there is no content, a non-breaking space is returned to ensure the
   * block is still displayed, with only the background image applied.
   *
   * @return string
   */
  function getContent() {
    $output = '<div id="halloween-lights"></div>';

    $path = backdrop_get_path('module', 'halloween_lights');
    backdrop_add_css($path . '/css/pumpkin.css');
    backdrop_add_js($path . '/js/pumpkin.js', array(
      'scope' => 'footer',
    ));

    return $output;
  }
}



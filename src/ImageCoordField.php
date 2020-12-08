<?php

namespace JonoM\ImageCoord;

use SilverStripe\Assets\Image;
use SilverStripe\Control\Director;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextField;
use SilverStripe\View\ArrayData;
use SilverStripe\View\Requirements;

/**
 * ImageCoordField class.
 * Facilitates the selection of a focus point on an image.
 *
 * @extends FieldGroup
 */
class ImageCoordField extends FieldGroup
{
    /**
     * Enable to view Focus X and Focus Y fields while in Dev mode.
     *
     * @var bool
     * @config
     */
    private static $debug = false;

    public function __construct($name, $xFieldName, $yFieldName, $imageURL, $width, $height, $cssGrid = false)
    {
        // Create the fields
        $previewImage = ArrayData::create([
            'Width' => $width,
            'Height' => $height,
            'URL' => $imageURL,
            'XFieldName' => $xFieldName,
            'YFieldName' => $yFieldName,
            'CSSGrid' => $cssGrid,
        ]);
        $fields = array(
            LiteralField::create('ImageCoordGrid', $previewImage->renderWith('JonoM\ImageCoord\ImageCoordGrid')),
            TextField::create($xFieldName),
            TextField::create($yFieldName),
        );

        parent::__construct($fields);

        $this->setName('ImageCoord');
        $this->setTitle($name);
        $this->addExtraClass('image-coord-fieldgroup');
        if (Director::isDev() && $this->config()->get('debug')) {
            $this->addExtraClass('debug');
        }
    }
}

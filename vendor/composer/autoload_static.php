<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitfac73ffbffb8958c5aaadd2d3b5d7b3e
{
    public static $prefixLengthsPsr4 = array (
        'V' => 
        array (
            'Views\\' => 6,
        ),
        'S' => 
        array (
            'Services\\' => 9,
        ),
        'M' => 
        array (
            'Models\\' => 7,
        ),
        'D' => 
        array (
            'Drawers\\' => 8,
        ),
        'B' => 
        array (
            'Base\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Views\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Views',
        ),
        'Services\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Services',
        ),
        'Models\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Models',
        ),
        'Drawers\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Drawers',
        ),
        'Base\\' => 
        array (
            0 => __DIR__ . '/../..' . '/Base',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitfac73ffbffb8958c5aaadd2d3b5d7b3e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitfac73ffbffb8958c5aaadd2d3b5d7b3e::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitfac73ffbffb8958c5aaadd2d3b5d7b3e::$classMap;

        }, null, ClassLoader::class);
    }
}
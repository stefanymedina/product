<?php

namespace ProductBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ProductControllerController extends Controller
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $product = $em->getRepository('ProductBundle:Product')->findOneBy(array('id' => 1));
        return $this->render('@Product/ProductController/index.html.twig', array(
          'product' => $product
            // ...
        ));
    }

}

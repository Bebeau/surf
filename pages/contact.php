<?php 

/*
Template Name: Contact
*/

get_header();

	if (have_posts()) : while (have_posts()) : the_post();
		// get image and set it as background of parallax div
		$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID), 'large' ); 
		if(!empty($image)) { ?>
			<div id="pageBanner" data-parallax='{"y" : 230, "smoothness": 1}' style="background:url(<?php echo $image[0]; ?>) no-repeat scroll center / cover">
		<?php } else { ?>
			<div id="pageBanner" class="default" data-parallax='{"y" : 230, "smoothness": 1}'>
		<?php } ?>
				<div class="outer">
					<div class="inner">
						<?php the_title("<h1>","</h1>"); ?>
					</div>
				</div>
			</div>
		<?php
		echo '<section id="contact" class="section">';
			echo '<div class="container">';
				echo '<div class="outer">';
					echo '<div class="inner">';
			    		the_content(); ?>
			    		<form role="form" method="POST" action="" id="contactfrm">
					        <div class="half">
					            <input type="text" name="firstname" id="firstname" class="form-control" placeholder="first name"/>
					            <input type="text" name="lastname" id="lastname" class="form-control" placeholder="last name"/>
					        </div>
					        <div class="half">
					            <input type="text" name="company" id="company" class="form-control" placeholder="company"/>
					            <input type="text" name="title" id="title" class="form-control" placeholder="title"/>
					        </div>
					        <div class="half">
					            <input type="text" name="emailaddress" id="emailaddress" class="form-control" placeholder="email"/>
					            <div id="dropdown">
					                <button>Area of interest <i class="fa fa-angle-down"></i></button>
					                <ul class="dropdown-menu">
					                    <li data-value="Enterprise">Enterprise</li>
					                    <li data-value="Partnerships">Partnerships</li>
					                    <li data-value="Press/Event">Press / Event Inquiry</li>
					                    <li data-value="Other">Other</li>
					                </ul>
					            </div>
					            <input type="hidden" name="interest" id="interest" class="form-control"/>
					        </div>
					        <textarea type="text" name="message" id="message" class="form-control" placeholder="comment"></textarea>
					        <button type="submit" class="btn btn-submit">Submit</button>
					        <input type="hidden" name="password" id="password" val="" />
					    </form>
			    	<?php echo '</div>';
			    echo '</div>';
		    echo '</div>';
		echo '</section>';

	endwhile; endif;

get_footer(); ?>
from flask import Blueprint, render_template, request, jsonify, make_response
from utils.login_required import login_required
import services.points as points

points_controller = Blueprint('points_controller', __name__)

@points_controller.route('/points')
@login_required
def list_points():
    all_points = points.get_all()
    return render_template('points.html', points=all_points)

@points_controller.route('/points', methods=['POST'])
@login_required
def create_point():
    body = request.get_json()
    name = body.get('name')
    rfid = body.get('rfid')

    try:
        point_id = points.create_point(name=name, rfid=rfid)
        return make_response(jsonify(id=point_id, name=name, rfid=rfid), 201)
    except Exception as err:
        return make_response(jsonify(message=str(err)), 400)

@points_controller.route('/points/<int:point_id>', methods=['DELETE'])
@login_required
def remove_point(point_id):
    try:
        points.remove_point(point_id)
        return make_response('', 204)
    except Exception as err:
        return make_response(jsonify(message=str(err)), 400)

@points_controller.route('/points/<int:point_id>', methods=['PUT'])
@login_required
def update_point(point_id):
    body = request.get_json()
    name = body.get('name')
    rfid = body.get('rfid')

    try:
        point = points.update_point(point_id=point_id, name=name, rfid=rfid)
        return make_response(jsonify(point), 200)
    except Exception as err:
        return make_response(jsonify(message=str(err)), 400)

@points_controller.route('/points/<int:point_id>')
@login_required
def get_point(point_id):
    try:
        point = points.get_point(point_id)
        return make_response(jsonify(point), 200)
    except Exception as err:
        return make_response(jsonify(message=str(err)), 400)
